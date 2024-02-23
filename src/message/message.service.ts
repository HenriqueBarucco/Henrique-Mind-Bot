import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { EasyWhatsAppService } from 'src/easy-whatsapp/easy-whatsapp.service';

@Injectable()
export class MessageService {
    constructor(
        @Inject(forwardRef(() => EasyWhatsAppService))
        private readonly easyWhatsAppService: EasyWhatsAppService,
    ) {}

    async sendMessage(phone: string, message: string) {
        this.easyWhatsAppService.sendMessage(phone, message);
    }
}
