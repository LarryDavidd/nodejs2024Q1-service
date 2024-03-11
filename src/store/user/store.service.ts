import { User } from '@/utils/types';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StoreService {
  private store: User[] = null;

  constructor() {
    this.store = [];
  }

  getUsers() {
    return this.store;
  }

  getUser(id: string) {
    const user = this.store.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  createUser(user: User) {
    return this.store.push(user);
  }

  changePassword(id: string, password: string): User {
    const user = this.getUser(id);
    user.password = password;
    user.version += 1;
    user.updatedAt = Date.now();
    return user;
  }

  deleteUser(id: string) {
    const index = this.store.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.store.splice(index, 1);
      return true;
    }
    return false;
  }
}
