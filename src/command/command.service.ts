import { Injectable } from '@nestjs/common';
import { Message } from 'easy-whatsapp-lib/lib/cjs/types/message';

@Injectable()
export class CommandService {
    async handleCommand(command: string, action: string, message: Message) {
        console.log(
            `Command ${command} - ${action} received with message: ${message.message}`,
        );
    }
}
