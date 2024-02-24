import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import OpenAIApi from 'openai';
import { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources';

type Message = {
    text: string;
    ai?: boolean; // Indicate if the message is from the AI
};

@Injectable()
export class AIService {
    private openAI: OpenAIApi;

    constructor() {
        this.openAI = new OpenAIApi({
            apiKey: process.env.OPEN_AI_SECRET_KEY,
        });
    }

    async process(message: string): Promise<string> {
        return await this.chatGptRequest(
            `Você irá apenas converter texto natural em comandos seguindo a documentação abaixo!
            Não invente, adicione ou altere nenhum comando! Caso não seja possível nenhum comando, retorne apenas 'INVALIDO'
            
            Para adicionar filme:
            /movie add (NOME DO FILME)
            
            Para remover filme:
            /movie remove (NOME DO FILME)
            
            Para retornar lista de filmes:
            /movie list`,
            [{ text: message, ai: false }],
        );
    }

    private async chatGptRequest(
        prompt: string,
        messages: Message[],
    ): Promise<string> {
        try {
            const history = messages.map(
                (message): ChatCompletionMessageParam => ({
                    role: message.ai ? 'assistant' : 'user',
                    content: message.text,
                }),
            );

            const completion: ChatCompletion =
                await this.openAI.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: prompt,
                        },
                        ...history,
                    ],
                    temperature: 0.5,
                    max_tokens: 1000,
                });

            const [content] = completion.choices.map(
                (choice) => choice.message.content,
            );

            return content;
        } catch (e) {
            console.error(e);
            throw new ServiceUnavailableException('Failed request to ChatGPT');
        }
    }
}
