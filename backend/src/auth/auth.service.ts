import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByOne(email);
        console.log(user['isLocked']);
        if (user['isLocked']) {
            await user.incLoginAttempts();
            console.log('USER BLOCKED')
            return null;
        }


        if (user.validatePassword(password)) {
            const { password, ...result } = user;



            return result;
        }

        await user.incLoginAttempts();
        return null;
    }

    async login(user: User) {
        const payload = { username: user.email, sub: user['_id'] };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
