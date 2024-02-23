import { Module, forwardRef } from '@nestjs/common';
import { MovieService } from './movie.service';
import { PrismaService } from 'src/database/prisma.service';
import { MessageModule } from 'src/message/message.module';

@Module({
    imports: [forwardRef(() => MessageModule)],
    providers: [PrismaService, MovieService],
    exports: [MovieService],
})
export class MovieModule {}
