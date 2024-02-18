import { Module } from '@nestjs/common';
import { EasyWhatsAppModule } from './easy-whatsapp/easy-whatsapp.module';
import { CommandModule } from './command/command.module';

@Module({
    imports: [CommandModule, EasyWhatsAppModule],
})
export class AppModule {}
