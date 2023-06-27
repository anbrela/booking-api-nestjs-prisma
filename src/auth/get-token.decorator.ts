import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type TokenCookieType = string | undefined;

export const GetToken = createParamDecorator(
  (_data, ctx: ExecutionContext): TokenCookieType => {
    const req = ctx.switchToHttp().getRequest();

    if (req.cookies['access-token']) {
      return req.cookies['access-token'];
    }

    if (req.cookies['refresh-token']) {
      return req.cookies['refresh-token'];
    }

    return undefined;
  },
);
