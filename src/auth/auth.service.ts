import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';

type Payload = {
  userId: number;
  email: string;
};

type AccessTokenObj = {
  access_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signIn(dto: SignInDto): Promise<AccessTokenObj> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Wrong email or password!');
    }

    const isPasswordValid: boolean = await argon2.verify(
      user.password,
      dto.password,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException('Wrong email or password!');
    }

    return this.signToken({
      userId: user.id,
      email: user.email,
    });
  }

  async signUp(dto: SignUpDto): Promise<AccessTokenObj> {
    const userFound = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (Boolean(userFound)) {
      throw new ForbiddenException('User with such email does already exist!');
    }

    const passwordHash: string = await argon2.hash(dto.password);

    const userCreated = await this.prisma.user.create({
      data: {
        ...dto,
        password: passwordHash,
      },
    });

    return this.signToken({
      userId: userCreated.id,
      email: userCreated.email,
    });
  }

  async signToken(payload: Payload): Promise<AccessTokenObj> {
    const access_token = await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
    });

    return { access_token };
  }

  googleLogin(googleUserDto: any) {
    if (!googleUserDto) {
      return 'No user from google';
    }

    return {
      message: 'User info from Google',
      user: googleUserDto,
    };
  }
}
