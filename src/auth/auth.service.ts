import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constants';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user: User = await this.userService.findOneByUsername(username);
        if (user && bcrypt.compareSync(password, user.password)) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(authDto: AuthDto): Promise<{access_token: string, refresh_token: string}> {
        const {username, password} = authDto;
        const user = await this.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        const payload = {
            sub: user.id,
            username: user.username,
            roles: user.roles
        }
        const access_token: string = this.jwtService.sign(payload, {secret: jwtConstants.access_secret, expiresIn: jwtConstants.access_expires_in});
        const refresh_token: string = this.jwtService.sign(payload, {secret: jwtConstants.refresh_secret, expiresIn: jwtConstants.refresh_expires_in}); 
        await this.userService.update(user.id, {refreshToken: refresh_token});
        return {
            access_token,
            refresh_token 
        };
    }

    async refresh(token: string): Promise<{access_token: string, refresh_token: string}> {
        try {
            const {username} = await this.jwtService.verify(token, {secret: jwtConstants.refresh_secret});
            const user: User = await this.userService.findOneByUsername(username);
            if (token !== user.refreshToken) {
                throw new UnauthorizedException();
            }
            const payload = {
                sub: user.id,
                username: user.username,
                roles: user.roles
            };
            const access_token: string = this.jwtService.sign(payload, {secret: jwtConstants.access_secret, expiresIn: jwtConstants.access_expires_in});
            const refresh_token: string = this.jwtService.sign(payload, {secret: jwtConstants.refresh_secret, expiresIn: jwtConstants.refresh_expires_in}); 
            await this.userService.update(user.id, {refreshToken: refresh_token});
            return {
                access_token,
                refresh_token 
            };
        } catch(e) {
            throw new UnauthorizedException(e);
        }
    }

    async logout(token: string): Promise<string> {
        try {
            const {username} = await this.jwtService.verify(token, {secret: jwtConstants.refresh_secret});
            const user: User = await this.userService.findOneByUsername(username);
            if (token !== user.refreshToken) {
                throw new UnauthorizedException();
            }
            await this.userService.update(user.id, {refreshToken: null});
            return token;
        } catch(e) {
            throw new UnauthorizedException(e);
        }
    }
}
