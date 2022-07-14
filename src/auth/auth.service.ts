import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
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

    async login(authDto: AuthDto) {
        const {username, password} = authDto;
        const user = await this.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        const payload = {
            sub: user.id,
            username: user.username
        }
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
