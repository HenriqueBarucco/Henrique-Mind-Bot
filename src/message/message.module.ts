import { Module, forwardRef } from '@nestjs/common';
import { MessageService } from './message.service';
import { EasyWhatsAppModule } from 'src/easy-whatsapp/easy-whatsapp.module';

@Module({
    imports: [forwardRef(() => EasyWhatsAppModule)],
    providers: [MessageService],
    exports: [MessageService],
})
export class MessageModule {}
