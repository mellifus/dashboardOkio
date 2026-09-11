# ai-triage — primer paso real de IA

Un script chico para aprender la parte que en el dashboard todavía es de mentira:
que la IA **lea** un mensaje entrante, lo **clasifique** y **redacte** una respuesta —
sin enviar nada. El humano siempre aprueba. Ese es el diferencial frente a AgendaPro,
cuyos agentes auto-responden.

## Qué hace

Toma 3 mensajes de ejemplo (WhatsApp/Instagram del tenant sintético "Bella Vita",
cero datos reales) y para cada uno imprime: categoría, sentimiento, confianza, un
resumen de una línea y un borrador de respuesta. Si el mensaje describe un síntoma
médico, lo fuerza a "Consulta médica", escala a la profesional y reemplaza el borrador
por un mensaje seguro (nunca da consejo médico).

## Correr

Ya tenés Node instalado. Falta instalar las dependencias una vez:

```bash
npm install
```

**Self-check (gratis, no llama a la API):**

```bash
npm test
```

Verifica que la red de seguridad médica funcione. No gasta nada.

**La corrida real (llama a Claude — cuesta centavos):**

1. Conseguí una API key en https://console.anthropic.com y ponela en el entorno:
   ```bash
   # PowerShell (Windows):
   $env:ANTHROPIC_API_KEY = "sk-ant-..."
   ```
2. Corré:
   ```bash
   npm start
   ```

## Costo y modelo

Cada corrida son 3 llamadas chiquitas — fracciones de centavo. El modelo está en una
constante arriba de `triage.mjs` (`MODEL`). Viene en `claude-opus-5`; si querés abaratar
mientras aprendés, cambialo a `claude-haiku-4-5` (~5x más barato para esta tarea).

## Lo que sigue (cuando quieras)

Este script prueba el motor aislado. El próximo paso natural es enchufarlo a la vista
"Centro de Solicitudes" del dashboard, reemplazando el texto hardcodeado de
`ui_kits/clinic-platform/App.jsx` por esta salida real. Eso necesita un mini-backend
(para no exponer la API key en el navegador) — tema para otra sesión.
