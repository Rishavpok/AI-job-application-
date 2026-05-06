import { GoogleGenAI } from "@google/genai";
export class GeminiService {
    public ai;
    constructor() {
        this.ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        })
    }

    async analyze(prompt: string) {
        const response = await this.ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });

        return response.text
    }

    async interview(prompt: string) {
        const response = await this.ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });

        return response.text
    }
}