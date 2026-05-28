export type InputMethod = 'manual' | 'voice';

type DataLayerEvent =
  | { event: 'name_input'; method: InputMethod }
  | { event: 'name_displayed' }
  | { event: 'theme_loaded'; num: string }
  | { event: 'datalayer_viewed' };

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export const pushDataLayerEvent = (event: DataLayerEvent): void => {
  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }
  window.dataLayer.push(event);
};
