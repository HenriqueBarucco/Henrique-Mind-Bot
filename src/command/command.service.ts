import { Injectable } from '@nestjs/common';
import { Message } from 'easy-whatsapp-lib/lib/cjs/types/message';
import { MovieService } from 'src/movie/movie.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CommandService {
    constructor(
        private readonly userService: UserService,
        private readonly movieService: MovieService,
    ) {}

    async handleCommand(command: string, action: string, message: Message) {
        const user = await this.userService.findOrCreateUser(message);
        console.log(
            `Command ${command} - ${action} received with message: ${message.message}`,
        );
        switch (command) {
            case 'movie':
                this.movieService.handleCommand(action, message.message, user);
                break;
            default:
                console.log(`Command ${command} not found`);
                break;
        }
    }

    /*     private async handleMovieCommand(
        action: string,
        title: string,
        user: User,
    ) {
        switch (action) {
            case 'add':
                await this.movieService.addMovie(title, user);
                this.messageService.sendMessage(
                    user.phone,
                    'Adicionei o filme!! 👍',
                );
                break;
            case 'list':
                const movies = await this.movieService.listMovies(user);
                let message = '🍿 Lista de filmes:\n';
                movies.forEach((movie) => {
                    message += `- ${movie.title}\n`;
                });
                this.messageService.sendMessage(user.phone, message);
                break;
            default:
                console.log(`Movie Action ${action} not found`);
                break;
        }
    } */
}
