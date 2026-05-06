import Anthropic from "@anthropic-ai/sdk";

export class AnthropicService {
  public ai;
  constructor() {
    this.ai = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    })
  }

  async analyze(prompt: string) {
    const message = await this.ai.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const tailoredCV = (message.content[0] as { text: string }).text;

    return tailoredCV
  }

    async interview(prompt: string) {
    const message = await this.ai.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const tailoredCV = (message.content[0] as { text: string }).text;

    return tailoredCV
  }
}