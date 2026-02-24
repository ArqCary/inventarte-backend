import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const recuest = context.switchToHttp().getRequest();
    const user = recuest.user;
    return data ? user[data] : user;
  },
);
