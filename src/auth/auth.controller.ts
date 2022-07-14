import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Public, User } from 'src/decorators';
import { JwtAuthGuard } from 'src/guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
@ApiTags('Auth controller')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}
    
    @Post('login')
    @ApiOkResponse({type: TokenDto})
    async login(@Body() authDto: AuthDto) {
        return this.authService.login(authDto);
    }
}
