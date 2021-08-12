import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UsePipes,
  Request,
} from '@nestjs/common';
import type { Response } from 'express';
import { CreateUserDto } from './DTO/create-user.dto';
import { UsersService } from '../users/users.service';
import { hash } from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from '../constants/constants';
import { AuthService } from './auth.service';
import { JoiValidationPipe } from '../pipes/validation/validation.pipe';
import {
  userLogInCredentialSchema,
  userRegisterCredentialsSchema,
} from './auth.schema';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { UserDto } from '../users/DTO/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('/register')
  @UsePipes(new JoiValidationPipe(userRegisterCredentialsSchema))
  async createUser(
    @Body() { username, password, email }: CreateUserDto,
    @Res() res: Response,
  ) {
    const user = await this.usersService.findOneBy({
      OR: [
        {
          username,
        },
        {
          email,
        },
      ],
    });
    console.log(user);
    if (user) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ status: 409, message: 'User already exists' });
    }
    const hashedPassword = await hash(password, BCRYPT_SALT_ROUNDS);
    const savedUser = this.authService.saveUserToDatabase({
      username,
      password: hashedPassword,
      email,
    });
    if (savedUser) {
      return res.status(HttpStatus.CREATED).json({
        status: 201,
        message: 'User successfully created! You can log in now.',
      });
    }
  }
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @UsePipes(new JoiValidationPipe(userLogInCredentialSchema))
  async logInUser(@Request() { user: { username } }: UserDto) {
    return this.authService.login({ username });
  }
}
