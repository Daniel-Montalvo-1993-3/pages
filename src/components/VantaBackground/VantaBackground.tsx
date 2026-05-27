import { useEffect, useRef, useState } from 'react';
import type { VantaEffect } from '../../types/vanta';

/**
 * Props para el componente VantaBackground
 */
export interface VantaBackgroundProps {
  /** Color principal en formato hexadecimal (ej: 0xa855f7 para purple-500) */
  color?: number;
  /** Color de fondo en formato hexadecimal (ej: 0x1e1b4b para indigo-900) */
  backgroundColor?: number;
  /** Escala del efecto (default: 1.0) */
  scale?: number;
  /** Escala en dispositivos móviles (default: 1.0) */
  scaleMobile?: number;
  /** Habilitar controles de mouse (default: true) */
  mouseControls?: boolean;
  /** Habilitar controles táctiles (default: true) */
  touchControls?: boolean;
  /** Habilitar controles de giroscopio (default: false) */
  gyroControls?: boolean;
}

/**
 * Componente que renderiza un fondo animado 3D usando Vanta.js Topology
 * 
 * Este componente crea un efecto de red de partículas animadas que responde
 * a la interacción del mouse. Se posiciona con fixed/z-0 para estar detrás
 * del contenido principal.
 * 
 * Requiere que p5.js y vanta.topology.min.js estén cargados vía CDN en index.html
 */
export const VantaBackground: React.FC<VantaBackgroundProps> = ({
  color = 0xa855f7,        // purple-500
  backgroundColor = 0x1e1b4b, // indigo-900
  scale = 1.0,
  scaleMobile = 1.0,
  mouseControls = true,
  touchControls = true,
  gyroControls = false,
}) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<VantaEffect | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let retryTimeout: ReturnType<typeof setTimeout>;

    const initVanta = () => {
      // CDN con defer puede no estar listo aún — reintentar hasta que cargue
      if (!window.VANTA?.TOPOLOGY) {
        retryTimeout = setTimeout(initVanta, 100);
        return;
      }

      if (!vantaRef.current) return;

      try {
        vantaEffect.current = window.VANTA.TOPOLOGY({
          el: vantaRef.current,
          color,
          backgroundColor,
          scale,
          scaleMobile,
          mouseControls,
          touchControls,
          gyroControls,
        });
        setTimeout(() => setIsLoaded(true), 50);
      } catch (error) {
        console.error('[VantaBackground] Error al inicializar Vanta:', error);
      }
    };

    initVanta();

    return () => {
      clearTimeout(retryTimeout);
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, [color, backgroundColor, scale, scaleMobile, mouseControls, touchControls, gyroControls]);

  return (
    <div
      ref={vantaRef}
      className={`fixed inset-0 z-0 w-full h-full transition-opacity duration-700 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
      role="presentation"
    />
  );
};
