import { Injectable } from '@nestjs/common';
import { User, UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUsers() {
    const users = this.userRepository.getUsers();
    return users.map((user) => {
      const { _password, ...userInfo } = user;
      return userInfo;
    });
  }

  getUser(id: string) {
    const { _password, ...userInfo } = this.getUser(id);
    return userInfo;
  }

  createUser(userData: User) {
    const { _password, ...userInfo } = this.userRepository.createUser(userData);
    return userInfo;
  }

  updateUserPassword(id: string, { oldPassword, newPassword }) {
    const { _password, ...userInfo } = this.userRepository.updateUserPassword(
      id,
      newPassword,
    );
    return userInfo;
  }

  deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
