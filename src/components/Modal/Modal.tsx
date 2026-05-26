import { useEffect } from 'react';

interface ModalProps {
  /** Si el modal está abierto */
  isOpen: boolean;
  /** Callback para cerrar el modal */
  onClose: () => void;
  /** Título del modal */
  title?: string;
  /** Contenido del modal */
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  // Prevenir scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Overlay con blur */}
      <div
        className="
          absolute inset-0
          bg-black/50
          backdrop-blur-md
          transition-opacity duration-300
        "
        onClick={onClose}
        aria-label="Cerrar modal"
      />

      {/* Contenido del modal */}
      <div
        className="
          relative z-10
          bg-white rounded-2xl shadow-2xl
          max-w-md w-full
          transform transition-all duration-300
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          {title && (
            <h3
              id="modal-title"
              className="text-2xl font-bold text-gray-900"
            >
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="
              ml-auto p-2 rounded-full
              text-gray-400 hover:text-gray-600 hover:bg-gray-100
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
            aria-label="Cerrar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer con botón de cerrar */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="
              px-6 py-2.5 rounded-lg
              bg-blue-600 hover:bg-blue-700
              text-white font-medium
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              shadow-md hover:shadow-lg
            "
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
