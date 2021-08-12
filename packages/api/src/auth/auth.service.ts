import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user.dto';
import { PrismaService } from '../prisma.service';
import { LoginUserDto } from './DTO/login-user.dto';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async saveUserToDatabase({ username, password, email }: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        username,
        password,
        email,
      },
    });
  }
  async validateUser({ username, password }: LoginUserDto) {
    const user = await this.usersService.findOneBy({ username });
    if (user?.password) {
      return compare(password, user.password);
    }
    return null;
  }

  async login({ username }: { username: string }) {
    const payload = { username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
