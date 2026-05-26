import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('Modal', () => {
  it('no renderiza cuando isOpen es false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        <div>Test Content</div>
      </Modal>
    );
    
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('renderiza cuando isOpen es true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <div>Test Content</div>
      </Modal>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('muestra el título cuando se proporciona', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test Title">
        <div>Content</div>
      </Modal>
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('llama onClose al hacer click en el overlay', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Content</div>
      </Modal>
    );
    
    const overlay = screen.getByLabelText('Cerrar modal');
    await user.click(overlay);
    
    expect(handleClose).toHaveBeenCalled();
  });

  it('llama onClose al hacer click en el botón X', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    
    render(
      <Modal isOpen={true} onClose={handleClose} title="Title">
        <div>Content</div>
      </Modal>
    );
    
    const closeButton = screen.getByLabelText('Cerrar');
    await user.click(closeButton);
    
    expect(handleClose).toHaveBeenCalled();
  });

  it('tiene atributos de accesibilidad correctos', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test">
        <div>Content</div>
      </Modal>
    );
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });
});
