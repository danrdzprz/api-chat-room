import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PaginationOptions } from 'src/common/utils/pagination-options';

@Injectable()
export class UsersService {
  constructor(
    private user_repository: UserRepository,
  ) {}
  findAll(options: PaginationOptions) {
    return this.user_repository.index(options);
  }

  findOne(id: string) {
    return this.user_repository.detail(id);
  }
}
