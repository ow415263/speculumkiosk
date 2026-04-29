import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ArcCarousel from '../../components/kiosk/ArcCarousel';

const THINKING_WORDS = [
  'synthesizing',
  'decompressing',
  'rage-baiting',
  'catfishing',
  'honeypotting',
  'doom-scrolling',
  'dissociating',
  'manifesting',
  'oversharing',
  'conjuring',
  'spiraling',
  'pondering',
  'divining',
  'percolating',
  'gaslighting',
];

function ArrowIcon({ className }) {
  return (
    <svg
      className={className}
      width="96"
      height="96"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14.6444 85.3553C5.26758 75.9785 -0.000259194 63.2608 -0.000259753 50C-0.000260312 36.7392 5.26758 24.0215 14.6444 14.6447C24.0212 5.26784 36.7389 -7.09903e-07 49.9997 -1.26881e-06C63.2606 -1.82771e-06 75.9783 5.26784 85.3551 14.6447C94.7319 24.0215 99.9997 36.7392 99.9997 50C99.9997 63.2608 94.7319 75.9785 85.3551 85.3553C75.9783 94.7322 63.2606 100 49.9997 100C36.7389 100 24.0212 94.7322 14.6444 85.3553Z"
        fill="#ffffff"
      />
      <path
        d="M28.349 46.8755C27.9341 46.8683 27.522 46.9437 27.1366 47.0975C26.7511 47.2513 26.4002 47.4803 26.1043 47.7712C25.8083 48.062 25.5733 48.4089 25.4128 48.7916C25.2523 49.1743 25.1697 49.585 25.1697 50C25.1697 50.4149 25.2523 50.8257 25.4128 51.2084C25.5733 51.5911 25.8083 51.938 26.1043 52.2288C26.4002 52.5197 26.7512 52.7487 27.1366 52.9025C27.522 53.0562 27.9341 53.1317 28.349 53.1245L64.5529 53.1245L52.3199 65.3575C51.7339 65.9435 51.4046 66.7384 51.4046 67.5672C51.4046 68.396 51.7339 69.1908 52.3199 69.7769C52.906 70.3629 53.7008 70.6922 54.5296 70.6922C55.3584 70.6922 56.1533 70.3629 56.7393 69.7769L74.3065 52.2097C74.8926 51.6237 75.2218 50.8288 75.2218 50C75.2218 49.1712 74.8926 48.3763 74.3065 47.7903L56.7393 30.2231C56.1533 29.6371 55.3584 29.3078 54.5296 29.3078C53.7008 29.3078 52.906 29.6371 52.3199 30.2231C51.7339 30.8092 51.4046 31.604 51.4046 32.4328C51.4046 33.2616 51.7339 34.0565 52.3199 34.6425L64.5529 46.8755L28.349 46.8755Z"
        fill="#0a0a0a"
      />
    </svg>
  );
}

export function SignUpArrow({ open, onOpenSheet }) {
  return (
    <button
      className={`signup-arrow ${open ? 'is-active' : ''}`}
      type="button"
      onClick={onOpenSheet}
      aria-label="Sign up for more info"
      disabled={open}
    >
      <ArrowIcon className="arrow-icon" />
      <ThinkingText active={!!open} />
    </button>
  );
}

function ThinkingText({ active }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!active) return;
    setIndex(0);
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % THINKING_WORDS.length);
    }, 1700);
    return () => clearInterval(id);
  }, [active]);
  return (
    <span className="thinking-text">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          className="thinking-text-word"
          initial={{ y: 14, opacity: 0, rotateX: -85 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -14, opacity: 0, rotateX: 85 }}
          transition={{ duration: 0.32, ease: 'easeInOut' }}
        >
          {THINKING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const ASSET = (name) => `${import.meta.env.BASE_URL}kiosk/${name}`;

// Per-character annotation positions (px from the bottom-centre of the figure
// container, which is 360 wide and equal to item.height tall). lineLen is the
// stub line length that visually points at the figure; lineDir is "left" /
// "right" indicating which side of the label the line emerges from.
const ARTIFACT_FIGURES = [
  {
    id: 'bo',
    src: ASSET('bo-hero.png'),
    height: 620,
    label: 'Bo · Original',
    annotations: [
      { id: 'ultra-rare', text: 'ultra rare', side: 'right', x: 200, y: 380, lineLen: 60 },
      { id: 'unethical', text: 'made unethically', side: 'left', x: -180, y: 260, lineLen: 70 },
      { id: 'access', text: 'reflects access level', side: 'right', x: 220, y: 160, lineLen: 90 },
    ],
  },
  {
    id: 'fig1',
    src: ASSET('figure-1.png'),
    height: 600,
    label: 'Bizgeist 02',
    annotations: [
      { id: 'limited', text: 'limited drop', side: 'right', x: 200, y: 380, lineLen: 70 },
      { id: 'hand-cast', text: 'hand cast', side: 'left', x: -160, y: 260, lineLen: 60 },
      { id: 'shimmer', text: 'shimmer finish', side: 'right', x: 200, y: 160, lineLen: 80 },
    ],
  },
  {
    id: 'fig2',
    src: ASSET('figure-2.png'),
    height: 600,
    label: 'Bizgeist 03',
    annotations: [
      { id: 'one-of-twelve', text: 'one of twelve', side: 'right', x: 210, y: 400, lineLen: 70 },
      { id: 'glow-prone', text: 'glow-prone', side: 'left', x: -150, y: 280, lineLen: 60 },
      { id: 'wears-mood', text: 'wears your mood', side: 'left', x: -180, y: 160, lineLen: 80 },
    ],
  },
  {
    id: 'fig3',
    src: ASSET('figure-3.png'),
    height: 600,
    label: 'Bizgeist 04',
    annotations: [
      { id: 'self-cloning', text: 'self-cloning', side: 'right', x: 200, y: 380, lineLen: 70 },
      { id: 'dust-prone', text: 'dust-prone', side: 'left', x: -160, y: 260, lineLen: 60 },
      { id: 'whispers', text: 'whispers at night', side: 'right', x: 210, y: 160, lineLen: 80 },
    ],
  },
];

function FigureWithAnnotations({ src, height, alt, annotations, isSpotlight }) {
  return (
    <div
      className="figure-wrap"
      style={{ position: 'relative', height, width: 360 }}
    >
      <img
        src={src}
        alt={alt || ''}
        draggable={false}
        style={{
          display: 'block',
          height,
          width: 'auto',
          maxWidth: 360,
          objectFit: 'contain',
          objectPosition: 'bottom center',
          margin: '0 auto',
          filter: 'drop-shadow(0 24px 50px rgba(0,0,0,0.55))',
          pointerEvents: 'none',
        }}
      />
      {annotations && annotations.map((a, i) => (
        <FigureAnnotation
          key={a.id}
          annotation={a}
          index={i}
          active={!!isSpotlight}
        />
      ))}
    </div>
  );
}

function FigureAnnotation({ annotation, index, active }) {
  const { text, side, x, y, lineLen } = annotation;
  // Stagger each annotation's reveal so they pop in one after another.
  const delaySec = 0.5 + index * 0.18;
  return (
    <div
      className={`figure-annotation ${active ? 'is-active' : ''} side-${side}`}
      style={{
        left: '50%',
        bottom: y,
        '--ann-x': `${x}px`,
        '--reveal-delay': `${delaySec}s`,
        '--glitch-delay': `${delaySec + 0.6 + index * 0.4}s`,
        '--line-len': `${lineLen}px`,
      }}
    >
      <span className="figure-annotation-line" />
      <span className="figure-annotation-text">{text}</span>
    </div>
  );
}

export function ArtifactsPage() {
  const items = ARTIFACT_FIGURES.map((f) => ({
    id: f.id,
    height: f.height,
    label: f.label,
    width: 360,
    render: ({ isSpotlight }) => (
      <FigureWithAnnotations
        src={f.src}
        height={f.height}
        alt={f.label}
        annotations={f.annotations}
        isSpotlight={isSpotlight}
      />
    ),
  }));
  return (
    <>
<div className="page-header artifacts-header">
        <div className="bo-lockup">
          <img
            src={ASSET('bo-the-bizgeist-logo.svg')}
            alt="BO the Bizgeist"
            className="bo-logo"
          />
          <p className="bo-subheading">create like a scientist edit like a child</p>
        </div>
      </div>
      <div className="arc-carousel-host">
        <ArcCarousel items={items} initialIndex={0} height={620} spotlightX="50%" variant="figures" />
      </div>
    </>
  );
}

function PhoneScreen({ annotations, isSpotlight }) {
  return (
    <div className="phone-stack">
      <div className="phone-frame">
        <div className="phone-real">
          <img src={ASSET('app-screen.png')} alt="" className="phone-real-screen" />
        </div>
        {annotations && annotations.map((a, i) => (
          <FigureAnnotation key={a.id} annotation={a} index={i} active={!!isSpotlight} />
        ))}
      </div>
    </div>
  );
}

const PHONE_FLOWS = [
  {
    id: 'p1',
    title: 'Tap In/Out',
    annotations: [
      { id: 'track', text: 'track your moves', side: 'left', x: -200, y: 420, lineLen: 70 },
      { id: 'discover', text: 'discover more', side: 'right', x: 200, y: 380, lineLen: 70 },
      { id: 'realtime', text: 'in real time', side: 'right', x: 200, y: 260, lineLen: 60 },
      { id: 'cult', text: 'earn your cult status', side: 'left', x: -220, y: 160, lineLen: 80 },
    ],
  },
  {
    id: 'p2',
    title: 'Discover',
    annotations: [
      { id: 'curated', text: 'curated rituals', side: 'right', x: 200, y: 400, lineLen: 70 },
      { id: 'whispers', text: 'whispers nearby', side: 'left', x: -200, y: 280, lineLen: 70 },
      { id: 'tonight', text: 'just for tonight', side: 'right', x: 200, y: 160, lineLen: 70 },
    ],
  },
  {
    id: 'p3',
    title: 'Inner Circle',
    annotations: [
      { id: 'rsvp', text: 'rsvp by gut feel', side: 'left', x: -200, y: 400, lineLen: 70 },
      { id: 'auras', text: 'see who\'s aura-matched', side: 'right', x: 220, y: 280, lineLen: 80 },
      { id: 'forecast', text: 'mood forecast', side: 'left', x: -180, y: 160, lineLen: 70 },
    ],
  },
  {
    id: 'p4',
    title: 'Loot Drops',
    annotations: [
      { id: 'fullmoon', text: 'full-moon only', side: 'right', x: 200, y: 400, lineLen: 70 },
      { id: 'limited', text: 'limited to 12', side: 'left', x: -180, y: 280, lineLen: 70 },
      { id: 'access', text: 'cult-tier access', side: 'right', x: 200, y: 160, lineLen: 70 },
    ],
  },
  {
    id: 'p5',
    title: 'Wonder',
    annotations: [
      { id: 'ambient', text: 'ambient prompts', side: 'left', x: -200, y: 400, lineLen: 70 },
      { id: 'no-feed', text: 'no feed, no scroll', side: 'right', x: 210, y: 280, lineLen: 70 },
      { id: 'sleep', text: 'sleeps when you do', side: 'left', x: -200, y: 160, lineLen: 70 },
    ],
  },
];

const CLOSE_DRAG_PX = 110;
// Endpoint that emails get POSTed to (e.g. a Formspree URL). Configure via
// VITE_SIGNUP_ENDPOINT env var. If unset the form just closes the sheet
// without sending anything.
const SIGNUP_ENDPOINT = import.meta.env.VITE_SIGNUP_ENDPOINT || '';

export function SignUpSheet({ open, onClose }) {
  const qrSrc = ASSET('testflight-qr-placeholder.png');
  const [dragging, setDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const startYRef = useRef(0);

  const onHandleDown = (e) => {
    setDragging(true);
    startYRef.current = e.clientY;
    setDragY(0);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onHandleMove = (e) => {
    if (!dragging) return;
    // Allow only downward drag (closing direction).
    setDragY(Math.max(0, e.clientY - startYRef.current));
  };
  const onHandleUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragY > CLOSE_DRAG_PX) onClose();
    setDragY(0);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    const form = e.currentTarget;
    const email = form.elements.email.value.trim();
    if (!email) return;
    if (!SIGNUP_ENDPOINT) {
      // No endpoint configured — close as a no-op so dev flow still works.
      console.warn('Email signup endpoint not configured (VITE_SIGNUP_ENDPOINT).');
      onClose();
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch(SIGNUP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, source: 'specuflux-kiosk' }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
      form.reset();
      // Hold the success message on screen long enough to read.
      setTimeout(() => { setStatus('idle'); onClose(); }, 3600);
    } catch (err) {
      console.error('Signup failed:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2200);
    }
  };

  const submitLabel =
    status === 'submitting' ? 'Sending…' :
    status === 'success'    ? 'Got it!'   :
    status === 'error'      ? 'Try again' :
                              'Get Early Access!';

  return (
    <>
      <div
        className={`bottom-sheet-backdrop ${open ? 'is-open' : ''}`}
        onPointerDown={onClose}
      />
      <div
        className={`bottom-sheet ${open ? 'is-open' : ''} ${dragging ? 'is-dragging' : ''}`}
        role="dialog"
        aria-hidden={!open}
        style={{ '--drag-y': `${dragY}px` }}
      >
        <div
          className={`bottom-sheet-handle ${dragging ? 'is-dragging' : ''}`}
          onPointerDown={onHandleDown}
          onPointerMove={onHandleMove}
          onPointerUp={onHandleUp}
          onPointerCancel={onHandleUp}
        />
        <div className="bottom-sheet-inner">
          <h2 className="bottom-sheet-title">Discover your <em>True Inner Self</em></h2>
          <p className="bottom-sheet-lede">
            Get on the whitelist for exclusive access to events, rare artifacts and experiences.
            Coming this summer.
          </p>
          {status === 'success' ? (
            <div className="bottom-sheet-confirm" role="status" aria-live="polite">
              <p className="bottom-sheet-confirm-title">Your email's been received.</p>
              <p className="bottom-sheet-confirm-sub">We'll be in contact.</p>
            </div>
          ) : (
            <form className="bottom-sheet-form" onSubmit={onSubmit}>
              <input
                type="email"
                name="email"
                placeholder="you@gmail.com"
                className="bottom-sheet-input"
                required
                disabled={status === 'submitting'}
              />
              <button
                type="submit"
                className={`bottom-sheet-submit status-${status}`}
                disabled={status === 'submitting'}
              >
                {submitLabel}
              </button>
            </form>
          )}
          <div className="bottom-sheet-qrs">
            <div className="qr-tile">
              <span className="qr-tile-label">test the app</span>
              <img src={qrSrc} alt="" className="qr-tile-img" />
            </div>
            <div className="qr-tile">
              <span className="qr-tile-label">test the game</span>
              <img src={qrSrc} alt="" className="qr-tile-img" />
            </div>
            <div className="qr-tile">
              <span className="qr-tile-label">follow on socials</span>
              <img src={qrSrc} alt="" className="qr-tile-img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const APP_INITIAL_INDEX = 2;

export function AppPage() {
  const [activeIndex, setActiveIndex] = useState(APP_INITIAL_INDEX);
  const activeFlow = PHONE_FLOWS[activeIndex] || PHONE_FLOWS[APP_INITIAL_INDEX];
  const items = PHONE_FLOWS.map((s) => ({
    id: s.id,
    height: 620,
    render: ({ isSpotlight }) => (
      <PhoneScreen
        annotations={s.annotations}
        isSpotlight={isSpotlight}
      />
    ),
  }));
  return (
    <>
      <div className="page-header">
        <div className="sf-lockup">
          <img src={ASSET('appicon1.svg')} alt="" className="sf-app-icon" />
          <div className="sf-text">
            <img
              src={ASSET('specuflux-wordmark.svg')}
              alt="SpecuFlux"
              className="sf-wordmark-img"
            />
            <span className="sf-tagline">return to wondering</span>
            <span className="sf-tagline-meta">early beta access available now</span>
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeFlow.id}
          className="app-section-title"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28 }}
        >
          {activeFlow.title}
        </motion.div>
      </AnimatePresence>
      <div className="arc-carousel-host phone-arc-host">
        <ArcCarousel
          items={items}
          initialIndex={APP_INITIAL_INDEX}
          height={620}
          spotlightX="50%"
          variant="phones"
          onActiveChange={setActiveIndex}
        />
      </div>
    </>
  );
}

const LEADERS = [
  { id: 'faiz', name: 'Faiz Kazi', role: 'Creative Director', img: ASSET('leader-faiz.jpg') },
  { id: 'owen', name: 'Owen Campbell', role: 'App Designer', img: ASSET('leader-owen.jpg') },
  { id: 'deep', name: 'Deep Grewal', role: 'Game Designer', img: ASSET('leader-deep.jpg') },
];

const LEADERS_INITIAL_INDEX = 1; // Owen centred by default

function LeaderCard({ leader }) {
  return (
    <div className="leader-card">
      <div
        className="leader-portrait"
        style={{ '--portrait-img': `url(${leader.img})` }}
      />
      <h3 className="leader-name">{leader.name}</h3>
      <button className="leader-role-pill" type="button">{leader.role}</button>
    </div>
  );
}

export function AboutPage() {
  const items = LEADERS.map((l) => ({
    id: l.id,
    height: 540,
    width: 360,
    render: () => <LeaderCard leader={l} />,
  }));
  return (
    <>
      <div className="page-header about-header">
        <img
          src={ASSET('your-cult-leaders.svg')}
          alt="Your Cult Leaders"
          className="cult-title-img"
        />
      </div>
      <div className="arc-carousel-host leaders-host">
        <ArcCarousel
          items={items}
          initialIndex={LEADERS_INITIAL_INDEX}
          height={540}
          spotlightX="50%"
          variant="leaders"
        />
      </div>
    </>
  );
}

const GAME_TILES = [
  {
    id: 'menu',
    src: ASSET('game-menu.jpg'),
    title: 'Skin Code Screen',
    annotations: [
      { id: 'play', text: 'tap to play', side: 'right', x: 320, y: 380, lineLen: 70 },
      { id: 'host', text: 'host or join', side: 'left', x: -320, y: 260, lineLen: 70 },
      { id: 'cult', text: 'pick your cult skin', side: 'right', x: 320, y: 140, lineLen: 80 },
    ],
  },
  {
    id: 'character',
    src: ASSET('game-character.jpg'),
    title: 'The Sub-Humanoid',
    annotations: [
      { id: 'main', text: 'main character', side: 'left', x: -320, y: 380, lineLen: 70 },
      { id: 'sidekick', text: 'with a sidekick', side: 'right', x: 320, y: 260, lineLen: 70 },
      { id: 'evolved', text: 'highly evolved', side: 'left', x: -300, y: 140, lineLen: 70 },
    ],
  },
  {
    id: 'dungeon',
    src: ASSET('game-dungeon.jpg'),
    title: 'Level 2 of 6',
    annotations: [
      { id: 'progress', text: '1/6 complete', side: 'right', x: 320, y: 380, lineLen: 70 },
      { id: 'find', text: 'find the exit', side: 'left', x: -320, y: 260, lineLen: 70 },
      { id: 'spikes', text: 'mind the spikes', side: 'right', x: 310, y: 140, lineLen: 70 },
    ],
  },
  {
    id: 'intro',
    src: ASSET('game-intro.jpg'),
    title: 'Specuflux Presents',
    annotations: [
      { id: 'press', text: 'press start', side: 'right', x: 320, y: 380, lineLen: 70 },
      { id: 'fever', text: 'a fever dream', side: 'left', x: -320, y: 260, lineLen: 70 },
      { id: 'speculum', text: 'by Speculum', side: 'right', x: 310, y: 140, lineLen: 70 },
    ],
  },
];

const GAME_INITIAL_INDEX = 1; // character art centred by default

function GameTile({ src, alt, annotations, isSpotlight }) {
  return (
    <div className="game-stack">
      <div className="game-frame">
        <img src={src} alt={alt} className="game-thumb" />
        {annotations && annotations.map((a, i) => (
          <FigureAnnotation key={a.id} annotation={a} index={i} active={!!isSpotlight} />
        ))}
      </div>
    </div>
  );
}

export function GamePage() {
  const [activeIndex, setActiveIndex] = useState(GAME_INITIAL_INDEX);
  const activeTile = GAME_TILES[activeIndex] || GAME_TILES[GAME_INITIAL_INDEX];
  const items = GAME_TILES.map((t) => ({
    id: t.id,
    height: 540,
    width: 540,
    render: ({ isSpotlight }) => (
      <GameTile
        src={t.src}
        alt={t.title}
        annotations={t.annotations}
        isSpotlight={isSpotlight}
      />
    ),
  }));
  return (
    <>
      <div className="page-header game-header">
        <div className="game-lockup">
          <img
            src={ASSET('game-logo.svg')}
            alt="THE Sub-Humanoidz"
            className="game-logo"
          />
          <p className="game-subheading">for the basement dwellers</p>
        </div>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeTile.id}
          className="app-section-title"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28 }}
        >
          {activeTile.title}
        </motion.div>
      </AnimatePresence>
      <div className="arc-carousel-host game-arc-host">
        <ArcCarousel
          items={items}
          initialIndex={GAME_INITIAL_INDEX}
          height={540}
          spotlightX="50%"
          variant="games"
          onActiveChange={setActiveIndex}
        />
      </div>
    </>
  );
}
