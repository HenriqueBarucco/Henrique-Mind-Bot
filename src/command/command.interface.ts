import { User } from '@prisma/client';

export interface ICommand {
    handleCommand(action: string, text: string, user: User): Promise<void>;
}
