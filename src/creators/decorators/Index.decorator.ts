import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx) => {
    const req = ctx;

    const {
      id,
      name,
      username,
      password,
      active,
      createAt,
      telephone
    } = req.user

    const user = {
      id,
      name,
      username,
      password,
      active,
      createAt,
      telephone
    }

    return data ? user?.[data] : user
  },
);