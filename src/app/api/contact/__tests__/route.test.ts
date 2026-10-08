// src/app/api/contact/__tests__/route.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from '../route';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/validation';

// Mock de Resend
vi.mock('resend');
vi.mock('@/lib/env', () => ({
  env: {
    RESEND_API_KEY: 'dummy',
    CONTACT_EMAIL: 'test@example.com',
  },
}));

// Mock de NextResponse
vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn((body, init) => ({
      json: async () => body,
      status: init?.status || 200,
      headers: new Headers(init?.headers),
    })),
  },
}));

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createMockRequest = (body: any, ip = '127.0.0.1') => {
    const headers = new Headers();
    if (ip !== 'unknown') {
      headers.set('x-forwarded-for', ip);
    }
    return {
      json: async () => body,
      headers,
    } as unknown as Request;
  };

  const validBody = {
  country: 'Venezuela',
  topic: 'saas',
  name: 'Test User',
  company: 'Test Company',
  email: 'user@example.com',
  phone: '+1234567890',
  message: 'Valid message',
};

describe('Honeypot', () => {
  it('responde 200 y no envía correo cuando honeypot tiene valor', async () => {
    const mockSend = vi.fn();
    (Resend as any).mockImplementation(() => ({
      emails: { send: mockSend },
    }));

    const req = createMockRequest({
      ...validBody,
      honeypot: 'spam',
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it('procesa normalmente cuando honeypot está vacío', async () => {
    const mockSend = vi.fn().mockResolvedValue({ id: 'test' });
    (Resend as any).mockImplementation(() => ({
      emails: { send: mockSend },
    }));

    const req = createMockRequest({
      ...validBody,
      honeypot: '',
    });

    const response = await POST(req);
    expect(mockSend).toHaveBeenCalledTimes(1);
  });
});

  describe('Sanitización mejorada', () => {
    it('elimina etiquetas script de los campos de texto', async () => {
      const mockSend = vi.fn().mockResolvedValue({ id: 'test' });
      (Resend as any).mockImplementation(() => ({
        emails: { send: mockSend },
      }));

      const req = createMockRequest({
        ...validBody,
        name: '<script>alert("xss")</script>John',
        message: 'Hello <b>bold</b> and <img src=x onerror=alert(1)>',
      });

      await POST(req);

      // Verificar que el texto enviado a Resend no contiene <script>
      const callArgs = mockSend.mock.calls[0][0];
      expect(callArgs.html).not.toContain('<script>');
      expect(callArgs.html).not.toContain('onerror');
      // Puede contener &lt; &gt; escapados
    });
  });

  describe('Rate limiting', () => {
    it('permite hasta 5 peticiones por IP en 60 segundos', async () => {
      const mockSend = vi.fn().mockResolvedValue({ id: 'test' });
      (Resend as any).mockImplementation(() => ({
        emails: { send: mockSend },
      }));

      const ip = '192.168.1.100';

      // Enviar 5 peticiones
      for (let i = 0; i < 5; i++) {
        const req = createMockRequest(validBody, ip);
        const response = await POST(req);
        expect(response.status).toBe(200);
      }

      // La sexta debe devolver 429
      const req = createMockRequest(validBody, ip);
      const response = await POST(req);
      expect(response.status).toBe(429);
      const data = await response.json();
      expect(data.error).toMatch(/Too many requests/);
    });

    it('resetea el contador después de 60 segundos', async () => {
      // Mock de Date.now para simular el paso del tiempo
      const now = Date.now();
      vi.spyOn(Date, 'now').mockReturnValue(now);

      const mockSend = vi.fn().mockResolvedValue({ id: 'test' });
      (Resend as any).mockImplementation(() => ({
        emails: { send: mockSend },
      }));

      const ip = '192.168.1.200';

      // Enviar 5 peticiones en tiempo t
      for (let i = 0; i < 5; i++) {
        const req = createMockRequest(validBody, ip);
        await POST(req);
      }

      // Avanzar 61 segundos
      vi.spyOn(Date, 'now').mockReturnValue(now + 61000);

      // La siguiente petición debe pasar
      const req = createMockRequest(validBody, ip);
      const response = await POST(req);
      expect(response.status).toBe(200);
    });
  });

  describe('Headers de rate limit', () => {
    it('incluye RateLimit‑Remaining en respuestas exitosas', async () => {
      const mockSend = vi.fn().mockResolvedValue({ id: 'test' });
      (Resend as any).mockImplementation(() => ({
        emails: { send: mockSend },
      }));

      const req = createMockRequest(validBody);

      const response = await POST(req);
      const remaining = response.headers.get('RateLimit-Remaining');
      expect(remaining).toBe('4'); // después de una petición
    });
  });

  describe('Manejo de errores sin filtración', () => {
    it('responde 500 cuando Resend falla, sin detalles internos', async () => {
      const mockSend = vi.fn().mockRejectedValue(new Error('Resend API error'));
      (Resend as any).mockImplementation(() => ({
        emails: { send: mockSend },
      }));

      const req = createMockRequest(validBody);

      const response = await POST(req);
      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data.error).toBe('Internal processing error');
      expect(data).not.toHaveProperty('stack');
    });
  });
});