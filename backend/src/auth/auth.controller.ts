import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    // @Get()
    // getHello(): string {
    //     return this.authService.getAuth();
    // }

    //@UseGuards(AuthGuard('local'))//Instead of this, create your own class
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);

    }


}
