import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { StoreModule } from '@/store/user/store.module';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
  imports: [StoreModule],
})
export class UserModule {}
