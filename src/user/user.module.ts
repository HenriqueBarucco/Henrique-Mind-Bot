import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
    providers: [PrismaService, UserService],
    exports: [UserService],
})
export class UserModule {}
