import { AnthropicService } from "./claude";
import { GeminiService } from "./gemni";

 export class AIService {
    public client
    constructor(type: string) {
        if (type === 'claude') {
            this.client = new AnthropicService()
        } else {
            this.client = new GeminiService()
        }
    }

     async analyze(prompt : string) {
         return await this.client.analyze(prompt)
    }
}