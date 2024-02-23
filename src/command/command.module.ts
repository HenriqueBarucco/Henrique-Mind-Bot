import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { UserModule } from 'src/user/user.module';
import { MovieModule } from 'src/movie/movie.module';

@Module({
    imports: [UserModule, MovieModule],
    providers: [CommandService],
    exports: [CommandService],
})
export class CommandModule {}
