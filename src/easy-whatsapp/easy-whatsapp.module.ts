import { Module } from '@nestjs/common';
import { EasyWhatsAppService } from './easy-whatsapp.service';
import { CommandModule } from 'src/command/command.module';

@Module({
    imports: [CommandModule],
    providers: [EasyWhatsAppService],
})
export class EasyWhatsAppModule {}
