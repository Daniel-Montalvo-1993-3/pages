/**
 * Declaraciones de tipos para Vanta.js cargado vía CDN
 * Vanta.js se registra globalmente en window.VANTA
 */

declare global {
  interface Window {
    VANTA?: {
      TOPOLOGY: (options: VantaTopologyOptions) => VantaEffect;
    };
    p5?: unknown;
  }
}

/**
 * Opciones para el efecto Vanta TOPOLOGY
 */
export interface VantaTopologyOptions {
  el: HTMLElement | null;
  color?: number;
  backgroundColor?: number;
  scale?: number;
  scaleMobile?: number;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
}

/**
 * Instancia del efecto Vanta con método destroy para cleanup
 */
export interface VantaEffect {
  destroy: () => void;
}

export {};
