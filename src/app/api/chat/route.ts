// src/app/api/chat/route.ts
import { createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, tool } from 'ai';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

// Forzamos Edge Runtime para latencia ultrabaja
export const runtime = 'edge';

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: {
    'HTTP-Referer': 'https://plexuscode.com',
    'X-Title': 'Plexus Code AI',
  },
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Reloj en tiempo real en español (Caracas) para referencia absoluta de Leo
    const fechaActual = new Date().toLocaleString('es-VE', {
      timeZone: 'America/Caracas',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    // 2. Director de Orquesta: Definición del Cerebro y Restricciones Negativas
    const result = streamText({
      model: openrouter(process.env.LLM_MODEL || 'anthropic/claude-haiku-5.5'),
      
      system: `[CONTEXTO TEMPORAL ACTUAL]
Hoy es ${fechaActual} (GMT-4). Usa esta fecha y hora exacta como referencia obligatoria para proponer reuniones en días hábiles futuros (ej. mañana o pasado mañana). Jamás ofrezcas días que ya pasaron.

[IDENTIDAD Y REGLAS DE ORO]
Eres Leo, especialista de admisión de proyectos y SDR de Plexus Code, firma de ingeniería de software especializada en automatización con IA, plataformas web/móviles (SaaS) y ciberseguridad.
- BREVEDAD LETAL: Tus respuestas deben tener un MÁXIMO de 2 a 3 oraciones cortas. Ve directo al grano como un ejecutivo por WhatsApp.
- LENGUAJE CLARO Y HUMANO: Habla de forma profesional y sencilla para cualquier tipo de cliente. Queda ESTRICTAMENTE PROHIBIDO usar la frase "cuello de botella" o jerga técnica pesada. Habla de ahorrar tiempo, eliminar trabajo manual, evitar errores y escalar operaciones.
- CERO EFECTO LORO: Jamás repitas como robot los mismos datos o cifras que el cliente ya te dijo. Asimila la información y avanza.
- PROHIBIDO PEDIR DISCULPAS EN BUCLE: Si el cliente corrige algo o presiona, mantén la postura ejecutiva sin decir frases sumisas como "disculpa la confusión".
- MEMORIA ESTRICTA: Si el cliente ya dio su nombre, correo o WhatsApp, NUNCA se lo vuelvas a pedir.

[MÉTODO DE DIAGNÓSTICO (MÁXIMO 3 PREGUNTAS)]
1. Haz un máximo de 3 preguntas en toda la charla (siempre 1 sola pregunta abierta por mensaje). Al recibir la tercera respuesta (o si el cliente pide reunión antes), prohíbido hacer más preguntas de negocio y pasa directo a agendar.
2. Explica brevemente qué proceso automatizaríamos y menciona de manera sencilla alguna tecnología preliminar (ej. conectar la API de WhatsApp, una base de datos en tiempo real en Supabase o un panel en Next.js), aclarando que la arquitectura final se define en la llamada.

[REGLAS DE CIERRE Y AGENDA]
- Propón una sesión rápida de 30 minutos con los líderes de desarrollo dando 2 opciones concretas de horario y solicita los datos que falten (Nombre, Correo, WhatsApp).
- Usa la herramienta 'verificar_disponibilidad' para chequear horarios reales y 'guardar_lead_y_reunion' para registrar la cita en la base de datos corporativa.
- CERO PRECIOS: Jamás des presupuestos en el chat; el alcance y la inversión exacta los definen los líderes de desarrollo.`,

      messages: await convertToModelMessages(messages),

      // 3. Herramientas (Tools) conectadas en vivo a Supabase
      tools: {
        verificar_disponibilidad: tool({
          description: 'Verifica los bloques horarios disponibles para las reuniones técnicas.',
          parameters: z.object({
            fecha_preferida: z.string().describe('Fecha solicitada por el cliente en formato YYYY-MM-DD'),
          }),
          execute: async ({ fecha_preferida }) => {
            // Consultamos en Supabase si hay citas agendadas en esa fecha
            const { data, error } = await supabase
              .from('meetings')
              .select('meeting_date')
              .gte('meeting_date', `${fecha_preferida}T00:00:00`)
              .lte('meeting_date', `${fecha_preferida}T23:59:59`);

            if (error) return { status: 'error', mensaje: 'No se pudo consultar el calendario.' };

            return {
              status: 'success',
              fecha: fecha_preferida,
              horarios_ocupados: data.map(m => m.meeting_date),
              horarios_sugeridos: ['10:00 AM', '3:00 PM', '5:00 PM']
            };
          },
        }),

        guardar_lead_y_reunion: tool({
          description: 'Guarda el expediente del lead y bloquea la reunión en Supabase.',
          parameters: z.object({
            name: z.string().describe('Nombre completo del cliente'),
            email: z.string().describe('Correo electrónico'),
            whatsapp: z.string().describe('Número de WhatsApp'),
            business_summary: z.string().describe('Resumen breve de lo que necesita automatizar'),
            meeting_datetime: z.string().describe('Fecha y hora exacta acordada en formato ISO o YYYY-MM-DD HH:mm'),
          }),
          execute: async ({ name, email, whatsapp, business_summary, meeting_datetime }) => {
            // 1. Guardamos el lead en la tabla leads
            const { data: leadData, error: leadError } = await supabase
              .from('leads')
              .insert([{ name, email, whatsapp, business_summary }])
              .select()
              .single();

            if (leadError || !leadData) {
              return { status: 'error', mensaje: 'Error al registrar el expediente del cliente.' };
            }

            // 2. Guardamos la reunión vinculada al lead
            const { error: meetingError } = await supabase
              .from('meetings')
              .insert([{ lead_id: leadData.id, meeting_date: meeting_datetime }]);

            if (meetingError) {
              return { status: 'error', mensaje: 'El lead se guardó pero hubo un error al bloquear la agenda.' };
            }

            return {
              status: 'success',
              mensaje: 'Expediente creado y reunión confirmada exitosamente en el sistema de Plexus Code.'
            };
          },
        }),
      },
      
      // Permitimos que el modelo ejecute herramientas automáticamente de forma consecutiva si es necesario
      maxSteps: 3,
    });

    return result.toUIMessageStreamResponse();
    
  } catch (error) {
    console.error("Error en la matriz de Leo:", error);
    return new Response(
      JSON.stringify({ error: "Sistemas de comunicación interceptados. Leo no está disponible." }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}