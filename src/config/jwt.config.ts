import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = (configService: ConfigService): JwtModuleOptions => ({
  secret: configService.get('JWT_SECRET', 'your-secret-key'),
  signOptions: {
    expiresIn: configService.get('JWT_EXPIRES_IN', '1d'),
  },
});

export const jwtRefreshConfig = (configService: ConfigService): JwtModuleOptions => ({
  secret: configService.get('JWT_REFRESH_SECRET', 'your-refresh-secret'),
  signOptions: {
    expiresIn: configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
  },
});