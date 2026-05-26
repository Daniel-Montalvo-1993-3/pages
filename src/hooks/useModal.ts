import { useState, useCallback } from 'react';

interface UseModalReturn {
  /** Si el modal está abierto */
  isOpen: boolean;
  /** Abrir el modal */
  open: () => void;
  /** Cerrar el modal */
  close: () => void;
  /** Toggle del estado del modal */
  toggle: () => void;
}

/**
 * Custom hook para manejar el estado de un modal
 * @param initialState - Estado inicial del modal (abierto/cerrado)
 * @returns Objeto con el estado y funciones para controlar el modal
 */
export const useModal = (initialState = false): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
