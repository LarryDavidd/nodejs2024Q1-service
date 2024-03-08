import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUsers() {
    const users = this.userRepository.getUsers();
    return users.map((user) => {
      const { password, ...userInfo } = user;
      return userInfo;
    });
  }

  getUser(id: string) {
    this.isValidId(id);
    const user = this.isUserExist(id);

    const { password, ...userInfo } = user;
    return userInfo;
  }

  createUser(userData: CreateUserDto) {
    const { password, ...userInfo } = this.userRepository.createUser(userData);
    return userInfo;
  }

  updateUserPassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    this.isValidId(id);
    const user = this.isUserExist(id);

    if (user.password !== oldPassword)
      throw new ForbiddenException('Wrong password');

    const { password, ...userInfo } = this.userRepository.updateUserPassword(
      id,
      newPassword,
    );
    return userInfo;
  }

  deleteUser(id: string) {
    this.isValidId(id);
    this.isUserExist(id);

    return this.userRepository.deleteUser(id);
  }

  isValidId(id: string) {
    if (!isUUID(id))
      throw new BadRequestException(`User id ${id} is not valid`);
  }

  isUserExist(id: string) {
    const user = this.userRepository.getUser(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
