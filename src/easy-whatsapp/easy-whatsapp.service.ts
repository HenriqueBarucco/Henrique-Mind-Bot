import { Injectable, OnModuleInit } from '@nestjs/common';
import { EasyWhatsApp } from 'easy-whatsapp-lib';
import { Message } from 'easy-whatsapp-lib/lib/cjs/types/message';
import { CommandService } from 'src/command/command.service';

@Injectable()
export class EasyWhatsAppService implements OnModuleInit {
    private connection: EasyWhatsApp;

    constructor(private readonly commandService: CommandService) {}

    onModuleInit() {
        this.connection = new EasyWhatsApp(process.env.EASY_WHATSAPP_KEY);

        this.connection.receiveMessage(this.handleReceivedMessage.bind(this));
    }

    private handleReceivedMessage(message: Message): void {
        if (message.message[0] !== '/') return;

        const command = {
            command: message.message
                .split(' ')[0]
                .replace('/', '')
                .toLowerCase(),
            action: message.message.split(' ')[1],
            message: {
                ...message,
                message: message.message.split(' ').slice(2).join(' '),
            },
        };

        this.commandService.handleCommand(
            command.command,
            command.action,
            command.message,
        );
    }
}
