import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSpeechInput } from './useSpeechInput';

const mockStartListening = vi.fn();
const mockStopListening = vi.fn();
const mockResetTranscript = vi.fn();

let mockTranscript = '';
let mockListening = false;
let mockBrowserSupport = true;

vi.mock('react-speech-recognition', () => ({
  default: {
    startListening: (...args: unknown[]) => mockStartListening(...args),
    stopListening: () => mockStopListening(),
  },
  useSpeechRecognition: () => ({
    transcript: mockTranscript,
    listening: mockListening,
    browserSupportsSpeechRecognition: mockBrowserSupport,
    resetTranscript: mockResetTranscript,
  }),
}));

describe('useSpeechInput', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockTranscript = '';
    mockListening = false;
    mockBrowserSupport = true;
  });

  it('retorna isListening false por defecto', () => {
    const onTranscript = vi.fn();
    const { result } = renderHook(() => useSpeechInput({ onTranscript }));
    expect(result.current.isListening).toBe(false);
  });

  it('retorna isSupported true cuando el navegador lo soporta', () => {
    const onTranscript = vi.fn();
    const { result } = renderHook(() => useSpeechInput({ onTranscript }));
    expect(result.current.isSupported).toBe(true);
  });

  it('retorna isSupported false cuando el navegador no lo soporta', () => {
    mockBrowserSupport = false;
    const onTranscript = vi.fn();
    const { result } = renderHook(() => useSpeechInput({ onTranscript }));
    expect(result.current.isSupported).toBe(false);
  });

  it('llama startListening al hacer toggleListening cuando no está escuchando', () => {
    mockListening = false;
    const onTranscript = vi.fn();
    const { result } = renderHook(() => useSpeechInput({ onTranscript, lang: 'es-MX' }));

    act(() => {
      result.current.toggleListening();
    });

    expect(mockResetTranscript).toHaveBeenCalled();
    expect(mockStartListening).toHaveBeenCalledWith({ continuous: true, language: 'es-MX' });
  });

  it('llama stopListening al hacer toggleListening cuando está escuchando', () => {
    mockListening = true;
    const onTranscript = vi.fn();
    const { result } = renderHook(() => useSpeechInput({ onTranscript }));

    act(() => {
      result.current.toggleListening();
    });

    expect(mockStopListening).toHaveBeenCalled();
    expect(mockStartListening).not.toHaveBeenCalled();
  });

  it('llama onTranscript cuando el transcript cambia', () => {
    const onTranscript = vi.fn();
    mockTranscript = 'hola mundo';
    renderHook(() => useSpeechInput({ onTranscript }));
    expect(onTranscript).toHaveBeenCalledWith('hola mundo');
  });

  it('respeta maxLength al llamar onTranscript', () => {
    const onTranscript = vi.fn();
    mockTranscript = 'texto muy largo que supera el límite';
    renderHook(() => useSpeechInput({ onTranscript, maxLength: 5 }));
    expect(onTranscript).toHaveBeenCalledWith('texto');
  });

  it('no llama onTranscript cuando el transcript está vacío', () => {
    const onTranscript = vi.fn();
    mockTranscript = '';
    renderHook(() => useSpeechInput({ onTranscript }));
    expect(onTranscript).not.toHaveBeenCalled();
  });

  it('expone stopListening que llama a SpeechRecognition.stopListening', () => {
    const onTranscript = vi.fn();
    const { result } = renderHook(() => useSpeechInput({ onTranscript }));

    act(() => {
      result.current.stopListening();
    });

    expect(mockStopListening).toHaveBeenCalled();
  });

  it('llama stopListening al desmontar el hook', () => {
    const onTranscript = vi.fn();
    const { unmount } = renderHook(() => useSpeechInput({ onTranscript }));

    unmount();

    expect(mockStopListening).toHaveBeenCalled();
  });
});
