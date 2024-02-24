import { Module } from '@nestjs/common';
import { EasyWhatsAppModule } from './easy-whatsapp/easy-whatsapp.module';
import { CommandModule } from './command/command.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { AIModule } from './ai/ai.module';

@Module({
    imports: [
        MovieModule,
        UserModule,
        EasyWhatsAppModule,
        CommandModule,
        MessageModule,
        AIModule,
    ],
})
export class AppModule {}
