import { BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';

const isValidId = (id: string) => {
  if (!isUUID(id)) throw new BadRequestException(`Invalid id ${id}`);
};

export default isValidId;
