import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { StoreService } from '../store/user/store.service';
import { CreateUserDto } from './dto/create-user.dto';

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
  constructor(private readonly storeService: StoreService) {}

  getUsers(): User[] {
    return this.storeService.getUsers();
  }

  getUser(id: string): User {
    return this.storeService.getUser(id);
  }

  createUser(userData: CreateUserDto): User {
    const newUser: User = {
      id: uuid(),
      login: userData.login,
      password: userData.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.storeService.createUser(newUser);
    return newUser;
  }

  updateUserPassword(id: string, newPassword: string): User {
    const user = this.storeService.changePassword(id, newPassword);
    return user;
  }

  deleteUser(id: string): boolean {
    return this.storeService.deleteUser(id);
  }
}
