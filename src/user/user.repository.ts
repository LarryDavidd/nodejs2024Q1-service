import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { StoreService } from '../store/user/store.service';

export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

@Injectable()
export class UserRepository {
  private readonly store: StoreService = null;

  constructor() {
    this.store = new StoreService();
  }

  getUsers(): User[] {
    return this.store.getUsers();
  }

  getUser(id: string): User {
    return this.store.getUser(id);
  }

  createUser(userData: User): User {
    const newUser: User = {
      id: uuid(),
      login: userData.login,
      password: userData.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.store.createUser(newUser);
    return newUser;
  }

  updateUserPassword(id: string, newPassword: string): User {
    const user = this.store.changePassword(id, newPassword);
    return user;
  }

  deleteUser(id: string): boolean {
    return this.store.deleteUser(id);
  }
}
