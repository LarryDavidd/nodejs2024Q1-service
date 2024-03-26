import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Body,
  Delete,
  HttpException,
  Put,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import {
  ApiOperation,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Get all users
   */

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  getUsers() {
    return this.userService.getUsers();
  }

  /**
   * Get user by id
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get user' })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User with this id does not exist' })
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new HttpException(
        'User with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
    return user;
  }

  /**
   * Create new user
   */
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBadRequestResponse({
    description: ' Bad request. Body does not contain required fields',
  })
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  /**
   * Delete user by id
   */
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete user' })
  @ApiNoContentResponse({
    description: 'The user has been deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User with this id does not exist' })
  async deleteUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const user = await this.userService.deleteUser(id);
      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          'User with this id does not exist',
          StatusCodes.NOT_FOUND,
        );
      }
      throw e;
    }
  }

  /**
   * Update user by id
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User with this id does not exist' })
  @ApiForbiddenResponse({ description: 'Wrong old password' })
  @UsePipes(new ValidationPipe())
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    try {
      const user = await this.userService.updateUserPassword(
        id,
        updatePasswordDto,
      );
      if (!user) {
        const user = await this.userService.getUser(id);
        if (!user) {
          throw new HttpException(
            'User with this id does not exist',
            StatusCodes.NOT_FOUND,
          );
        }
        throw new HttpException('Wrong old password', StatusCodes.FORBIDDEN);
      }
      return user;
    } catch (e) {
      throw e;
    }
  }
}
