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
    // Verificar que Vanta esté disponible
    if (!window.VANTA || !window.VANTA.TOPOLOGY) {
      console.error('[VantaBackground] Vanta.js no está disponible. Asegúrate de que los scripts CDN estén cargados en index.html');
      return;
    }

    // Verificar que el elemento ref esté disponible
    if (!vantaRef.current) {
      console.error('[VantaBackground] El elemento ref no está disponible');
      return;
    }

    // Inicializar el efecto Vanta
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

      console.log('[VantaBackground] Efecto Vanta inicializado correctamente');
      
      // Mostrar Vanta con transición suave después de un breve delay
      setTimeout(() => setIsLoaded(true), 100);
    } catch (error) {
      console.error('[VantaBackground] Error al inicializar Vanta:', error);
    }

    // Cleanup: destruir el efecto cuando el componente se desmonte
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        console.log('[VantaBackground] Efecto Vanta destruido');
      }
    };
  }, [color, backgroundColor, scale, scaleMobile, mouseControls, touchControls, gyroControls]);
{`fixed inset-0 z-0 w-full h-full transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 z-0 w-full h-full"
      aria-hidden="true"
      role="presentation"
    />
  );
};
