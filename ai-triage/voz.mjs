// voz.mjs — La voz de Okio y el blindaje de formato, compartidos.
// Lo usan campana.mjs y recordatorio.mjs (mismo espíritu que triage.mjs).
// Tener esto en un solo lugar = si cambia el tono, lo cambiás una vez y vale para todo.

export const REGLAS_DE_VOZ = `Escribís para Okio, una clínica estética en Argentina.
- Español rioplatense, voseo (vos, tenés, reservá). Cálido y directo, sin exagerar ni vender humo.
- NO uses signos de apertura ¿ ¡, solo cerrá con ? o !. Ej: "Te reservo el turno?" y NO "¿Te reservo el turno?".
- Nada de promesas médicas ni resultados garantizados.
- Todo lo que generás es un BORRADOR: la dueña lo aprueba antes de publicar o enviar. Nada sale solo.`;

// Blindaje determinístico: saca los signos de apertura pase lo que pase con el prompt.
export function sinSignosDeApertura(texto) {
  return texto.replace(/[¿¡]/g, "");
}
