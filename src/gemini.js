import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * GeminiAgent: A helper class to interact with Google Gemini AI
 * to generate and iterate on event page HTML.
 */
export class GeminiAgent {
    constructor(apiKey) {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }

    /**
     * Generates HTML content based on a user prompt and optional existing data.
     */
    async generateHTML(prompt, context = {}) {
        const systemInstruction = `
      Eres un experto diseñador web y desarrollador frontend. 
      Tu tarea es generar el contenido del campo "html" para un archivo JSON de evento en Lippu.
      
      REGLAS CRÍTICAS:
      1. Genera SOLO el código HTML y CSS necesario (dentro de una etiqueta <style>).
      2. NO incluyas <html>, <head> o <body>. El contenido se inyectará en un <div>.
      3. Usa Vanilla CSS moderno (Flexbox, Grid, variables CSS). 
      4. TODAS las rutas de imágenes internas deben empezar con "public/images/events/".
      5. El diseño debe ser "vibrante", "premium" y "moderno".
      6. Usa fuentes de Google Fonts (Inter y Montserrat ya están cargadas).
      7. Asegúrate de que los botones de acción tengan enlaces claros (como #registro o links externos).
      8. El código debe ser una sola cadena de texto válida para un campo JSON.
    `;

        const fullPrompt = `
      ${systemInstruction}
      
      Contexto actual del evento:
      ${JSON.stringify(context, null, 2)}
      
      Instrucción del usuario:
      ${prompt}
      
      Genera el código HTML/CSS completo:
    `;

        try {
            const result = await this.model.generateContent(fullPrompt);
            const response = await result.response;
            let text = response.text();

            // Limpiar bloques de código markdown si existen
            text = text.replace(/```html/g, "").replace(/```/g, "").trim();

            return text;
        } catch (error) {
            console.error("Gemini AI Error:", error);
            throw new Error("No se pudo generar el contenido con IA. Revisa tu API Key.");
        }
    }
}
