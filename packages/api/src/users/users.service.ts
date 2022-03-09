import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findOneBy(where: Prisma.UserWhereInput) {
    return this.prisma.user.findFirst({
      where,
    });
  }
}
