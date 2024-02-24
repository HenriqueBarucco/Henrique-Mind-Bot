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
        switch (command) {
            case 'movie':
                this.movieService.handleCommand(action, message.message, user);
                break;
            default:
                console.log(`Command ${command} not found`);
                break;
        }
    }
}
