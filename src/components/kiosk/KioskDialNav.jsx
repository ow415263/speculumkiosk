import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

/**
 * KioskDialNav — landscape kiosk dial with N=4 tabs riding the top edge of
 * a wide bezel ellipse. Single spring on a continuous float; targetInt
 * grows unbounded so wrap-around is jerk-free.
 */

const N = 4;
const ITEM_W = 160;

function getSpacing() {
  const vw = (typeof window !== 'undefined' && window.innerWidth) || 1366;
  const max = (vw - 80 - ITEM_W) / 4;
  return Math.max(120, Math.min(220, max));
}

const BEZEL_W = 1900;
const BEZEL_H = 800;
const BEZEL_A = BEZEL_W / 2;
const BEZEL_B = BEZEL_H / 2;

// Labels ride the actual bezel ellipse so the curve they trace matches
// the dial they sit inside.
function arcY(x) {
  const r = Math.min(Math.abs(x) / BEZEL_A, 1);
  return BEZEL_B * (1 - Math.sqrt(1 - r * r));
}

const SPRING = { type: 'spring', stiffness: 320, damping: 30, mass: 0.9 };
const HARD_OPACITY_CUTOFF = 2.4;

function getDist(index, dialPos) {
  const raw = index - dialPos;
  return raw - Math.round(raw / N) * N;
}

function shortestDelta(targetInt, toIdx) {
  const currentLogical = ((targetInt % N) + N) % N;
  let delta = toIdx - currentLogical;
  if (delta > N / 2) delta -= N;
  if (delta < -N / 2) delta += N;
  return delta;
}

function NavItem({ index, item, dialPos, isActive, onTap, shifted, spacing }) {
  const xMV = useTransform(dialPos, (p) => {
    const d = getDist(index, p);
    return (shifted ? d + N : d) * spacing;
  });
  const yMV = useTransform(dialPos, (p) => {
    const d = getDist(index, p);
    const eff = shifted ? d + N : d;
    const x = eff * spacing;
    return arcY(x) + 12;
  });
  const scaleMV = useTransform(dialPos, (p) => {
    const d = getDist(index, p);
    const eff = Math.abs(shifted ? d + N : d);
    return Math.max(0.45, 1.0 - Math.min(eff, 2) * 0.18);
  });
  const opacityMV = useTransform(dialPos, (p) => {
    const d = getDist(index, p);
    const eff = Math.abs(shifted ? d + N : d);
    if (eff > HARD_OPACITY_CUTOFF) return 0;
    if (eff <= 1) return 1.0 - eff * 0.35;
    if (eff <= 2) return 0.65 - (eff - 1) * 0.20;
    return Math.max(0, 0.45 - (eff - 2) * 1.1);
  });

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: `calc(50% - ${ITEM_W / 2}px)`,
        width: ITEM_W,
        zIndex: shifted ? 5 : isActive ? 20 : 10,
        cursor: 'pointer',
        userSelect: 'none',
        touchAction: 'none',
        x: xMV,
        y: yMV,
        scale: scaleMV,
        opacity: opacityMV,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        onTap();
      }}
    >
      <span
        style={{
          fontFamily:
            'office-times-round, "Office Times Round", "Cormorant Garamond", "Times New Roman", serif',
          fontSize: isActive ? 32 : 22,
          fontWeight: isActive ? 700 : 400,
          color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
          letterSpacing: '0.005em',
          whiteSpace: 'nowrap',
          lineHeight: 1,
          textAlign: 'center',
          transition: 'color 0.2s ease, font-size 0.2s ease, font-weight 0.2s ease',
        }}
      >
        {item.label}
      </span>
    </motion.div>
  );
}

export default function KioskDialNav({ activeIndex, onChange, items }) {
  const dialPos = useMotionValue(activeIndex);
  const targetInt = useRef(activeIndex);
  const [spacing, setSpacing] = useState(getSpacing());

  useEffect(() => {
    const handler = () => setSpacing(getSpacing());
    window.addEventListener('resize', handler);
    window.addEventListener('orientationchange', handler);
    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('orientationchange', handler);
    };
  }, []);

  useEffect(() => {
    if (activeIndex == null) return;
    const currentLogical = ((targetInt.current % N) + N) % N;
    if (activeIndex !== currentLogical) {
      const delta = shortestDelta(targetInt.current, activeIndex);
      targetInt.current += delta;
      animate(dialPos, targetInt.current, SPRING);
    }
  }, [activeIndex, dialPos]);

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const lastStepAt = useRef(0);

  const onDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > spacing * 0.42) {
      const now = performance.now();
      if (now - lastStepAt.current < 80) return;
      lastStepAt.current = now;
      const dir = delta > 0 ? -1 : 1;
      const nextInt = targetInt.current + dir;
      const nextLogical = ((nextInt % N) + N) % N;
      targetInt.current = nextInt;
      animate(dialPos, targetInt.current, SPRING);
      dragStartX.current = e.clientX;
      onChange && onChange(nextLogical);
    }
  };
  const onUp = () => {
    isDragging.current = false;
  };
  const onTap = (index) => () => {
    const delta = shortestDelta(targetInt.current, index);
    if (delta === 0) return;
    targetInt.current += delta;
    animate(dialPos, targetInt.current, SPRING);
    onChange && onChange(index);
  };

  const activeLogical = ((targetInt.current % N) + N) % N;

  return (
    <div
      style={{ position: 'relative', height: 100, overflow: 'visible', userSelect: 'none' }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: -700,
          width: 1900,
          height: 800,
          borderRadius: '50%',
          background: '#000000',
          border: '0.5px solid rgba(40,40,40,1)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: -10,
          width: 180,
          height: 180,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      {items.map((item, index) => (
        <NavItem
          key={`primary-${item.id}`}
          index={index}
          item={item}
          dialPos={dialPos}
          isActive={index === activeLogical}
          onTap={onTap(index)}
          shifted={false}
          spacing={spacing}
        />
      ))}
      {items.map((item, index) => (
        <NavItem
          key={`shifted-${item.id}`}
          index={index}
          item={item}
          dialPos={dialPos}
          isActive={false}
          onTap={onTap(index)}
          shifted={true}
          spacing={spacing}
        />
      ))}
    </div>
  );
}
