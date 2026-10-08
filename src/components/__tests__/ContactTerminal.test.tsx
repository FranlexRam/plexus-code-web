// src/components/__tests__/ContactTerminal.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactTerminal from '../ContactTerminal';
import { LanguageProvider } from '@/context/LanguageContext';

const mockFetch = vi.fn();
global.fetch = mockFetch;

const renderWithLanguage = (ui: React.ReactNode) => {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
};

const getInputs = () => {
  const nameInputs = screen.getAllByPlaceholderText(/Ej. Franlex Ramírez/);
  const emailInputs = screen.getAllByPlaceholderText(/tu@empresa.com/);
  const messageInputs = screen.getAllByPlaceholderText(/Detalles sobre el proyecto/);
  // Tomar el primer input de cada uno (los inputs duplicados están en Footer, ignorar)
  return {
    nameInput: nameInputs[0],
    emailInput: emailInputs[0],
    messageInput: messageInputs[0],
  };
};

describe('ContactTerminal', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('envía datos válidos a la API y muestra éxito', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ message: 'Mensaje enviado' }),
    });

    renderWithLanguage(<ContactTerminal />);
    const user = userEvent.setup();

    const { nameInput, emailInput, messageInput } = getInputs();
    const submitButton = screen.getByRole('button', { name: /ENVIAR MENSAJE/ });

    await user.type(nameInput, 'Test Name');
    await user.type(emailInput, 'test@example.com');
    await user.type(messageInput, 'Test message');
    await user.click(submitButton);

    // Botón deshabilitado durante envío
    expect(submitButton).toBeDisabled();

    // Se llama a fetch con los datos correctos
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('"name":"Test Name"'),
      })
    );

    // Aparece pantalla de éxito
    await waitFor(() => {
      expect(screen.getByText(/MENSAJE RECIBIDO/)).toBeInTheDocument();
    });
  });

  it('muestra error cuando la API falla', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ error: 'Validation failed' }),
    });

    renderWithLanguage(<ContactTerminal />);
    const user = userEvent.setup();

    const { nameInput, emailInput, messageInput } = getInputs();
    const submitButton = screen.getByRole('button', { name: /ENVIAR MENSAJE/ });

    await user.type(nameInput, 'Test Name');
    await user.type(emailInput, 'test@example.com');
    await user.type(messageInput, 'Test message');
    await user.click(submitButton);

    // Aparece mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/An error occurred/)).toBeInTheDocument();
    });
  });

  it('valida email inválido sin enviar petición', async () => {
    renderWithLanguage(<ContactTerminal />);
    const user = userEvent.setup();

    const { emailInput } = getInputs();
    const submitButton = screen.getByRole('button', { name: /ENVIAR MENSAJE/ });

    await user.type(emailInput, 'not-an-email');
    await user.click(submitButton);

    // No se llama a fetch
    expect(mockFetch).not.toHaveBeenCalled();
    // Se muestra error de validación
    await waitFor(() => {
      expect(screen.getByText(/Por favor, corrige los errores en el formulario./)).toBeInTheDocument();
    });
  });
});