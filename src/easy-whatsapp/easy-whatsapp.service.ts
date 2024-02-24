import { Injectable, OnModuleInit } from '@nestjs/common';
import { EasyWhatsApp } from 'easy-whatsapp-lib';
import { Message } from 'easy-whatsapp-lib/lib/cjs/types/message';
import { AIService } from 'src/ai/ai.service';
import { CommandService } from 'src/command/command.service';

@Injectable()
export class EasyWhatsAppService implements OnModuleInit {
    private connection: EasyWhatsApp;

    constructor(
        private readonly commandService: CommandService,
        private readonly aiService: AIService,
    ) {}

    onModuleInit() {
        this.connection = new EasyWhatsApp(process.env.EASY_WHATSAPP_KEY);

        this.connection.receiveMessage(this.handleReceivedMessage.bind(this));
    }

    private async handleReceivedMessage(message: Message): Promise<void> {
        console.log('Received message:', message);

        let text = message.message.toLowerCase();

        if (process.env.AI_ENABLED === 'true') {
            text = await this.aiService.process(message.message);
        }

        if (text[0] !== '/') return;

        const command = {
            command: text.split(' ')[0].replace('/', '').toLowerCase(),
            action: text.split(' ')[1],
            message: {
                ...message,
                message: text.split(' ').slice(2).join(' '),
            },
        };

        this.commandService.handleCommand(
            command.command,
            command.action,
            command.message,
        );
    }

    async sendMessage(phone: string, message: string) {
        console.log(`Sending message to ${phone}: ${message}`);
        this.connection.sendMessage(phone, message);
    }
}
