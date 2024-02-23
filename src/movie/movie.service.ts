import { Injectable } from '@nestjs/common';
import { Movie, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MovieService {
    constructor(private readonly prisma: PrismaService) {}

    async addMovie(title: string, user: User) {
        const movie = await this.prisma.movie.findFirst({
            where: {
                title,
            },
        });

        if (movie) return;

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
    }

    async listMovies(user: User): Promise<Movie[]> {
        return this.prisma.movie.findMany({
            where: {
                userId: user.id,
            },
        });
    }
}
