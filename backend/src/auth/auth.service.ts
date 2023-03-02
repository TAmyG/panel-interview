import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByOne(email);
        if (user['isLocked']) {
            await user.incLoginAttempts();
            console.log('USER BLOCKED', `Invalid credentials. Attempts: ${user.loginAttempts}`);
            return { error: `User blocked until ${new Date(user.lockUntil)}` };
        }


        if (user.validatePassword(password)) {
            const { password, ...result } = user;

            // clean loginAttempts y blockedUntil
            await user.resetLoginAttempts();
            return { user: result };
        }

        await user.incLoginAttempts();
        return { error: `Invalid credentials. Attempts: ${user.loginAttempts}` };
    }

    async login(user: User) {
        const payload = { username: user.email, sub: user['_id'] };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
