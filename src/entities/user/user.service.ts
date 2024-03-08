import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { getHashPassword, isPasswordCorrect } from '@/utils/hash';
import isValidId from '@/utils/isValidId';

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
    isValidId(id);
    const user = this.userRepository.getUser(id);

    const { password, ...userInfo } = user;
    return userInfo;
  }

  async createUser(userData: CreateUserDto) {
    userData.password = await getHashPassword(userData.password);
    const { password, ...userInfo } = this.userRepository.createUser(userData);
    return userInfo;
  }

  async updateUserPassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    isValidId(id);
    const user = this.userRepository.getUser(id);

    if (await isPasswordCorrect(oldPassword, user.password))
      throw new ForbiddenException('Wrong password');

    const { password, ...userInfo } = this.userRepository.updateUserPassword(
      id,
      await getHashPassword(newPassword),
    );
    return userInfo;
  }

  deleteUser(id: string) {
    isValidId(id);

    return this.userRepository.deleteUser(id);
  }
}
