import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { User } from '@prisma/client';
import { ICommand } from 'src/command/command.interface';
import { PrismaService } from 'src/database/prisma.service';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class MovieService implements ICommand {
    constructor(
        private readonly prisma: PrismaService,
        @Inject(forwardRef(() => MessageService))
        private readonly messageService: MessageService,
    ) {}

    async handleCommand(action: string, text: string, user: User) {
        switch (action) {
            case 'add':
                await this.addMovie(text, user);
                break;
            case 'list':
                await this.listMovies(user);
                break;
            default:
                console.log(`Movie Action ${action} not found`);
                break;
        }
    }

    private async addMovie(title: string, user: User) {
        const movie = await this.prisma.movie.findFirst({
            where: {
                title,
            },
        });

        if (movie) {
            await this.messageService.sendMessage(
                user.phone,
                'Esse filme já está na sua lista! 😅',
            );
            return;
        }

        await this.prisma.movie.create({
            data: {
                title,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });

        await this.messageService.sendMessage(
            user.phone,
            'Adicionei o filme!! 👍',
        );
    }

    private async listMovies(user: User) {
        const movies = await this.prisma.movie.findMany({
            where: {
                userId: user.id,
            },
        });

        let message = '🍿 Lista de filmes:\n';
        movies.forEach((movie) => {
            message += `- ${movie.title}\n`;
        });

        this.messageService.sendMessage(user.phone, message);
    }
}
