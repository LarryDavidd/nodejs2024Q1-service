import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { getHashPassword, isPasswordCorrect } from '@/utils/hash';
import { isUUID } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers() {
    const users = await this.userRepository.getUsers();
    return users.map((user) => {
      return this.getUserWithoutPassword(user);
    });
  }

  private getUserWithoutPassword(user) {
    const { password, ...rest } = user;
    return {
      ...rest,
      updatedAt: Number(new Date(user.updatedAt)),
      createdAt: Number(new Date(user.createdAt)),
    };
  }

  async getUser(id: string) {
    this.isValidId(id);
    const user = await this.checkUserExists(id);

    return this.getUserWithoutPassword(user);
  }

  private async checkUserExists(id: string) {
    const user = await this.userRepository.getUser(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async createUser(userData: CreateUserDto) {
    userData.password = await getHashPassword(userData.password);
    const user = await this.userRepository.createUser(userData);
    return this.getUserWithoutPassword(user);
  }

  async updateUserPassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    this.isValidId(id);
    const user = await this.checkUserExists(id);

    if (await isPasswordCorrect(oldPassword, user.password))
      throw new ForbiddenException('Wrong password');

    const updatedUser = await this.userRepository.updateUserPassword(
      id,
      newPassword,
    );
    return this.getUserWithoutPassword(updatedUser);
  }

  async deleteUser(id: string) {
    this.isValidId(id);
    await this.checkUserExists(id);

    return this.userRepository.deleteUser(id);
  }

  private isValidId = (id: string) => {
    if (!isUUID(id)) throw new BadRequestException(`Invalid id ${id}`);
  };
}
