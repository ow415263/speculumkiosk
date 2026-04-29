import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

/**
 * ArcCarousel — infinite, symmetric Bécane-style carousel.
 *
 * Spotlight at center; ghosts fan symmetrically on both sides along an
 * asymmetric S-curve (left side drops gently, right side rises into the
 * bezel arc). Each item renders three copies (offsets -N, 0, +N) so a
 * duplicate can peek in from the opposite edge during a wrap-around.
 */

const VARIANTS = {
  figures: {
    slotBase: 360,
    // Slot ±1 stays at 360 from centre (only slotBase, no decay applied).
    // Slot ±2 lands at 360 + 360*0.9 = 684 from centre, which puts the
    // tile centre right on the page edge — i.e. half their body showing.
    slotDecay: 0.9,
    arcBLeft: 0,       // no left-side drop — figures must clear the dial
    arcBRight: 240,    // gentle right-side lift into the bezel arc
    op1Left: 0.42,
    op1Right: 0.55,
    op2Left: 0.30,
    op2Right: 0.38,
    opStep: 0.50,
    liftBoth: false,
    tiltDeg: 0,
  },
  phones: {
    // 62 px edge padding: side phones (scale 0.7 → width 196) sit with
    // their outer edge exactly 62 px from the page edge. Centre at
    // page-centre 683 → side centre at 62 + 98 = 160 → distance 523.
    slotBase: 523,
    slotDecay: 1,      // no decay — symmetric distance on both sides
    arcBLeft: 0,       // FLAT — no drop, no lift
    arcBRight: 0,
    dropBoth: false,
    tiltDeg: 0,        // straight up — no tilt
    op1Left: 0.7,
    op1Right: 0.7,
    op2Left: 0,        // only 3 phones visible at a time (active + ±1)
    op2Right: 0,
    opStep: 0,
  },
  games: {
    slotBase: 600,     // wide gap so side tiles get blank space AND extend
                       // partially off both page edges (mirrored)
    slotDecay: 1,      // equidistant on both sides
    arcBLeft: 0,       // FLAT — no drop, no lift, straight across
    arcBRight: 0,
    dropBoth: false,
    tiltDeg: 0,        // no tilt — thumbnails sit straight up
    op1Left: 0.5,      // side ghosts dimmer than the centre
    op1Right: 0.5,
    op2Left: 0,        // only 3 visible at a time
    op2Right: 0,
    opStep: 0,
  },
  leaders: {
    slotBase: 460,     // gap between leader cards
    slotDecay: 1,      // equidistant on both sides
    arcBLeft: 0,       // FLAT — no drop, no lift
    arcBRight: 0,
    dropBoth: false,
    tiltDeg: 0,        // no tilt
    op1Left: 0.7,
    op1Right: 0.7,
    op2Left: 0,        // only 3 cards visible (active + ±1)
    op2Right: 0,
    opStep: 0,
  },
};

const SCALE_RAMP = [1.0, 0.7, 0.45, 0.32];
const VISIBLE = 3;
const SPRING = { type: 'spring', stiffness: 260, damping: 30, mass: 0.95 };

function arcDrop(slot, cfg) {
  const x = slotX(slot, cfg);
  const a = 700;
  const b = slot < 0 ? cfg.arcBLeft : cfg.arcBRight;
  const r = Math.min(Math.abs(x) / a, 1);
  const magnitude = b * (1 - Math.sqrt(1 - r * r));
  // Default behaviour: S-curve (left drops positive, right lifts negative).
  // `liftBoth` → both sides lift up; `dropBoth` → both sides drop down.
  if (cfg.dropBoth) return magnitude;
  if (cfg.liftBoth) return -magnitude;
  return slot < 0 ? magnitude : -magnitude;
}

function slotX(slot, cfg) {
  if (slot === 0) return 0;
  const n = Math.abs(slot);
  const sign = Math.sign(slot);
  let total = 0;
  let step = cfg.slotBase;
  for (let i = 0; i < n; i++) {
    total += step;
    step *= cfg.slotDecay;
  }
  return sign * total;
}

function wrapSlot(s, N) {
  let v = ((s % N) + N) % N;
  if (v >= N / 2) v -= N;
  return v;
}

function slotScale(slot) {
  const n = Math.abs(slot);
  if (n >= SCALE_RAMP.length - 1) return SCALE_RAMP[SCALE_RAMP.length - 1];
  return SCALE_RAMP[Math.floor(n)];
}

function slotOpacity(slot, cfg) {
  const n = Math.abs(slot);
  if (n < 1) return 1.0;
  if (n < 2) return slot < 0 ? cfg.op1Left : cfg.op1Right;
  const op2 = slot < 0 ? cfg.op2Left : cfg.op2Right;
  if (n < 3) return op2;
  // Variants that zero out op2/opStep (e.g. phones, only 3 visible) need
  // the wrap-around copies to fully disappear — don't impose the legacy
  // 0.06 floor in that case.
  if (op2 === 0 || cfg.opStep === 0) return 0;
  let op = op2;
  for (let i = 2; i < n; i++) op *= cfg.opStep;
  return Math.max(0.06, op);
}

function interp(s, fn) {
  const lo = Math.floor(s);
  const hi = lo + 1;
  const t = s - lo;
  return fn(lo) * (1 - t) + fn(hi) * t;
}

function ArcItem({ index, item, posMV, total, wrapOffset, spotlightX, baseHeight, isSpotlight, cfg, onTap }) {
  const slotMV = useTransform(posMV, (p) => wrapSlot(index - p, total) + wrapOffset);
  const xMV = useTransform(slotMV, (s) => spotlightX + interp(s, (slot) => slotX(slot, cfg)));
  const yMV = useTransform(slotMV, (s) => interp(s, (slot) => arcDrop(slot, cfg)));
  const scaleMV = useTransform(slotMV, (s) => interp(s, (slot) => slotScale(slot)));
  const rotateMV = useTransform(slotMV, (s) => {
    if (!cfg.tiltDeg) return 0;
    // Tilt each side slot OUTWARD — left slot rotates CCW (top tilts left),
    // right slot rotates CW (top tilts right) so they fan away from centre.
    return s * cfg.tiltDeg;
  });
  const opMV = useTransform(slotMV, (s) => {
    if (Math.abs(s) > VISIBLE + 0.5) return 0;
    return interp(s, (slot) => slotOpacity(slot, cfg));
  });
  const zMV = useTransform(slotMV, (s) => Math.round(100 - Math.abs(s) * 5));

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        x: xMV,
        y: yMV,
        scale: scaleMV,
        rotate: rotateMV,
        opacity: opMV,
        zIndex: zMV,
        // Origin is at the bottom-LEFT of the layout box, which is the same
        // point as the inner content's bottom-CENTER (the inner div has
        // translateX(-50%) shifting content -W/2). Scaling around this
        // point keeps the visual centre at xMV regardless of scale, so
        // ghosts on either side stay equidistant from the spotlight.
        transformOrigin: '0% 100%',
        cursor: isSpotlight ? 'default' : 'pointer',
        userSelect: 'none',
        touchAction: 'none',
      }}
      onPointerDown={(e) => {
        if (!isSpotlight) {
          e.stopPropagation();
          onTap();
        }
      }}
    >
      <div
        style={{
          transform: 'translateX(-50%)',
          height: baseHeight,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        {item.render ? (
          item.render({ isSpotlight, baseHeight })
        ) : (
          <img
            src={item.src}
            alt={item.label || ''}
            draggable={false}
            style={{
              display: 'block',
              height: baseHeight,
              width: 'auto',
              maxWidth: item.width || 360,
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(0 24px 50px rgba(0,0,0,0.55))',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

export default function ArcCarousel({
  items,
  initialIndex = 0,
  height = 540,
  spotlightX = '50%',
  variant = 'figures',
  onActiveChange,
}) {
  const cfg = VARIANTS[variant] || VARIANTS.figures;
  const N = items.length;

  const [active, setActive] = useState(initialIndex);
  const posMV = useMotionValue(initialIndex);
  const targetRef = useRef(initialIndex);

  // Notify the parent whenever the spotlighted item changes so it can
  // render external chrome (page title, etc.) tied to the active item.
  useEffect(() => {
    if (onActiveChange) onActiveChange(active);
  }, [active, onActiveChange]);

  const hostRef = useRef(null);
  const [spotlightPx, setSpotlightPx] = useState(
    typeof spotlightX === 'number' ? spotlightX : 600
  );

  useEffect(() => {
    if (typeof spotlightX === 'number') {
      setSpotlightPx(spotlightX);
      return undefined;
    }
    const m = /^(-?\d+(?:\.\d+)?)%$/.exec(String(spotlightX));
    const pct = m ? parseFloat(m[1]) / 100 : 0.5;
    const update = () => {
      if (hostRef.current) setSpotlightPx(hostRef.current.clientWidth * pct);
    };
    update();
    const ro = new ResizeObserver(update);
    if (hostRef.current) ro.observe(hostRef.current);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [spotlightX]);

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(initialIndex);
  const accumDelta = useRef(0);

  const goTo = useCallback(
    (idx) => {
      const cur = posMV.get();
      const wrapped = ((idx % N) + N) % N;
      let candidate = wrapped;
      while (candidate - cur > N / 2) candidate -= N;
      while (cur - candidate > N / 2) candidate += N;
      targetRef.current = wrapped;
      animate(posMV, candidate, SPRING);
      setActive(wrapped);
    },
    [N, posMV]
  );

  useEffect(() => {
    const unsub = posMV.on('change', (v) => {
      const wrapped = ((Math.round(v) % N) + N) % N;
      setActive((prev) => (prev === wrapped ? prev : wrapped));
    });
    return unsub;
  }, [posMV, N]);

  const onPointerDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartPos.current = posMV.get();
    accumDelta.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    accumDelta.current = dx;
    const newPos = dragStartPos.current - dx / cfg.slotBase;
    posMV.set(newPos);
  };
  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (Math.abs(accumDelta.current) < 8) return;
    const settled = Math.round(posMV.get());
    const wrapped = ((settled % N) + N) % N;
    targetRef.current = wrapped;
    animate(posMV, settled, SPRING);
    setActive(wrapped);
  };

  return (
    <div
      ref={hostRef}
      className="arc-carousel"
      style={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'visible',
        userSelect: 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {items.flatMap((item, i) =>
        [-N, 0, N].map((wrapOffset) => (
          <ArcItem
            key={`${item.id}@${wrapOffset}`}
            index={i}
            item={item}
            posMV={posMV}
            total={N}
            wrapOffset={wrapOffset}
            spotlightX={spotlightPx}
            baseHeight={item.height || height * 0.92}
            isSpotlight={i === active && wrapOffset === 0}
            cfg={cfg}
            onTap={() => goTo(i)}
          />
        ))
      )}
    </div>
  );
}
