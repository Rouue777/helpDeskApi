import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Prisma } from 'generated/prisma/browser';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategies';

@Module({
  imports: [PrismaModule,
    JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: '1d',
  },
})
  ],
  controllers: [AuthController],
  providers: [AuthService,
    JwtStrategy,
  ]
})
export class AuthModule {}
