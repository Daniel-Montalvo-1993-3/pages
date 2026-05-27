import { describe, it, expect, beforeEach } from 'vitest';
import { pushDataLayerEvent } from './dataLayer';

describe('dataLayer', () => {
  beforeEach(() => {
    window.dataLayer = [];
  });

  it('inicializa window.dataLayer si no existe', () => {
    (window as unknown as { dataLayer: undefined }).dataLayer = undefined;
    pushDataLayerEvent({ event: 'name_displayed' });
    expect(window.dataLayer).toEqual([{ event: 'name_displayed' }]);
  });

  it('agrega eventos al dataLayer existente de forma acumulativa', () => {
    pushDataLayerEvent({ event: 'name_input', method: 'manual' });
    pushDataLayerEvent({ event: 'name_displayed' });
    expect(window.dataLayer).toHaveLength(2);
    expect(window.dataLayer[0]).toEqual({ event: 'name_input', method: 'manual' });
    expect(window.dataLayer[1]).toEqual({ event: 'name_displayed' });
  });

  it('preserva todas las propiedades del evento', () => {
    pushDataLayerEvent({ event: 'theme_loaded', num: '3' });
    expect(window.dataLayer[0]).toEqual({ event: 'theme_loaded', num: '3' });
  });

  it('registra correctamente el método voice en name_input', () => {
    pushDataLayerEvent({ event: 'name_input', method: 'voice' });
    expect(window.dataLayer[0]).toEqual({ event: 'name_input', method: 'voice' });
  });
});
