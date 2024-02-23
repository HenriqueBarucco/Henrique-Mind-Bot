import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Message } from 'easy-whatsapp-lib/lib/cjs/types/message';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    async findOrCreateUser(message: Message): Promise<User> {
        const userFound = await this.prisma.user.findFirst({
            where: {
                phone: message.phone,
            },
        });
        if (userFound) {
            return userFound;
        }
        return this.prisma.user.create({
            data: {
                name: message.name,
                phone: message.phone,
            },
        });
    }
}
