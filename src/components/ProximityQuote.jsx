import { useRef } from 'react';
import VariableProximity from './VariableProximity';
import './VariableProximity.css';

export default function ProximityQuote() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <VariableProximity
        label="Becoming better than yesterday, one step at a time."
        fromFontVariationSettings="'wght' 300"
        toFontVariationSettings="'wght' 700"
        containerRef={containerRef}
        radius={120}
        falloff="gaussian"
      />
    </div>
  );
}
