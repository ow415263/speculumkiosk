import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import KioskDialNav from '../../components/kiosk/KioskDialNav';
import {
  ArtifactsPage,
  AppPage,
  AboutPage,
  GamePage,
  SignUpSheet,
  SignUpArrow,
} from './pages.jsx';
import './kiosk.css';

const TABS = [
  { id: 'artifacts', label: 'artifacts', Page: ArtifactsPage, modifier: 'page-artifacts' },
  { id: 'app',       label: 'app',       Page: AppPage,       modifier: 'page-app' },
  { id: 'about',     label: 'about',     Page: AboutPage,     modifier: 'about-page' },
  { id: 'game',      label: 'game',      Page: GamePage,      modifier: 'game-page' },
];

const DEFAULT_INDEX = 0; // artifacts

export default function Kiosk() {
  const [active, setActive] = useState(DEFAULT_INDEX);
  const [showHint, setShowHint] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const lastInteractionRef = useRef(Date.now());
  const hintTimerRef = useRef(null);
  const stageRef = useRef(null);

  const noteInteraction = () => {
    lastInteractionRef.current = Date.now();
    setShowHint(false);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    hintTimerRef.current = setTimeout(() => setShowHint(true), 25000);
  };

  useEffect(() => {
    const handler = () => noteInteraction();
    window.addEventListener('pointerdown', handler);
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('pointerdown', handler);
      window.removeEventListener('keydown', handler);
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, []);

  // Scale-to-fit: 1366×1024 design fits any viewport, letterboxed.
  useLayoutEffect(() => {
    const fit = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const s = Math.min(window.innerWidth / 1366, window.innerHeight / 1024);
      const tx = (window.innerWidth - 1366 * s) / 2;
      const ty = (window.innerHeight - 1024 * s) / 2;
      stage.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <div className="kiosk-root">
      <div className="kiosk-viewport">
        <div className="kiosk-stage" ref={stageRef}>
          {showHint && <div className="idle-hint">tap or drag</div>}
          {TABS.map((t, i) => (
            <div
              key={t.id}
              className={`kiosk-page ${t.modifier} ${i === active ? 'is-active' : ''}`}
            >
              <t.Page />
            </div>
          ))}
          <SignUpArrow open={sheetOpen} onOpenSheet={() => setSheetOpen(true)} />
          <SignUpSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
          <div className="nav-host">
            <KioskDialNav
              activeIndex={active}
              onChange={(i) => {
                noteInteraction();
                if (i !== active) setSheetOpen(false);
                setActive(i);
              }}
              items={TABS.map((t) => ({ id: t.id, label: t.label }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
