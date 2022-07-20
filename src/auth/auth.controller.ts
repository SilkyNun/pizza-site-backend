import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiProduces, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { type } from 'os';
import { Public, User } from 'src/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/guards';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { AuthDto } from './dto/auth.dto';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
@ApiTags('Auth controller')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}
    
    @Post('login')
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({type: TokenDto})
    async login(@Body() authDto: AuthDto, @Res({passthrough: true}) res: Response) {
        const tokens = await this.authService.login(authDto);
        res.cookie(jwtConstants.refresh_cookie_name, tokens.refresh_token, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true});
        return tokens;
    }

    @Post('refresh')
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({type: TokenDto})
    async refresh(@Req() req: Request, @Res({passthrough: true}) res: Response) {        
        const {refresh_token} = req.cookies;
        const tokens = await this.authService.refresh(refresh_token);
        res.cookie(jwtConstants.refresh_cookie_name, tokens.refresh_token, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true});
        return tokens;
    }

    @Post('logout')
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse()
    async logout(@Req() req: Request, @Res({passthrough: true}) res: Response) {
        const {refresh_token} = req.cookies;
        const token =  await this.authService.logout(refresh_token);
        res.clearCookie(jwtConstants.refresh_cookie_name);
        return {
            refresh_token: token
        }
    }

}