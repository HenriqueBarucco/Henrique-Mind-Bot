import { Module } from '@nestjs/common';
import { EasyWhatsAppService } from './easy-whatsapp.service';
import { CommandModule } from 'src/command/command.module';
import { AIModule } from 'src/ai/ai.module';

@Module({
    imports: [CommandModule, AIModule],
    providers: [EasyWhatsAppService],
    exports: [EasyWhatsAppService],
})
export class EasyWhatsAppModule {}
