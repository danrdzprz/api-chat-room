import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationOptions } from 'src/common/utils/pagination-options';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { IsValidUser } from 'src/common/helpers/guards/is-valid-user.guard';
import { UserDto } from './dto/user.dto';
import { IsValid } from 'src/common/helpers/decorators/is-valid.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Regresa todos lost usuarios, se necesitar estar logueado.' })
  @ApiResponse({
    status:200,
    description: 'Lista de Usuarios',
    type: PaginationUserDto
  })
  findAll(@Query() options: PaginationOptions): Promise<PaginationUserDto> {
    return this.usersService.findAll(options);
  }

  @Get(':id')
  @UseGuards(IsValidUser)
  @ApiResponse({
    status:200,
    type: UserDto
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Regresa un usuario en especifico, se necesitar estar logueado.' })
  findOne(@IsValid() @Param('id') id: string) {
    return this.usersService.findOne(id);
  }

}
