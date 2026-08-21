'use client';

import { useEffect, useRef, useState } from 'react';

import AmbientBackground from '../components/AmbientBackground';
import HeroSymbol from '../components/HeroSymbol';
import AutomationScene from '../scenes/AutomationScene';
import ConversationScene from '../scenes/ConversationScene';
import DashboardScene from '../scenes/DashboardScene';
import OriginScene from '../scenes/OriginScene';
import SymbolScene from '../scenes/SymbolScene';
import WhiteLabelScene from '../scenes/WhiteLabelScene';
import { useCinematicTimeline } from './useCinematicTimeline';

export default function CinematicLanding() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => setEnhanced(true), []);

  useCinematicTimeline(rootRef, enhanced);

  return (
    <div
      ref={rootRef}
      className={`syrum-cinematic${
        enhanced ? ' syrum-cinematic--enhanced' : ''
      }`}
    >
      <div className="syrum-cinematic-stage">
        <HeroSymbol />
        <AmbientBackground />
        <OriginScene />
        <SymbolScene />
        <ConversationScene />
        <AutomationScene />
        <DashboardScene />
        <WhiteLabelScene />
      </div>
    </div>
  );
}
