import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: number): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    delete user.password;

    return user;
  }
}
