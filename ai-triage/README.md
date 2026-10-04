# ai-triage: primer paso real de IA

Un script chico para aprender la parte que en el dashboard todavía es de mentira:
que la IA **lea** un mensaje entrante, lo **clasifique** y **redacte** una respuesta,
pero sin enviar nada. Siempre aprueba una persona. Eso es lo que nos diferencia de
AgendaPro, cuyos agentes responden solos.

## Qué hace

Toma 3 mensajes de ejemplo (WhatsApp/Instagram del tenant sintético "Bella Vita",
sin ningún dato real) y para cada uno imprime la categoría, el sentimiento, la
confianza, un resumen de una línea y un borrador de respuesta. Si el mensaje describe
un síntoma médico, lo pasa a "Consulta médica", lo deriva a la profesional y cambia el
borrador por un mensaje seguro (nunca da consejo médico).

## Correr

Ya tenés Node instalado. Falta instalar las dependencias una vez:

```bash
npm install
```

**Self-check (gratis, no llama a la API):**

```bash
npm test
```

Verifica que funcione la red de seguridad médica. No gasta nada.

**La corrida real (llama a Claude y cuesta centavos):**

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

Cada corrida hace 3 llamadas chiquitas, que cuestan fracciones de centavo. El modelo
está en una constante arriba de `triage.mjs` (`MODEL`). Viene en `claude-opus-5`; si
querés gastar menos mientras aprendés, cambialo a `claude-haiku-4-5` (~5x más barato
para esta tarea).

## Lo que sigue (cuando quieras)

Este script prueba el motor solo. El próximo paso lógico es enchufarlo a la vista
"Centro de Solicitudes" del dashboard y cambiar el texto fijo de
`ui_kits/clinic-platform/App.jsx` por esta salida real. Para eso hace falta un
mini-backend (así la API key no queda expuesta en el navegador), y eso es para otra
sesión.
