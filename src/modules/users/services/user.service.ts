import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../entities/dto/create-user.dto';
import { hashPassword } from 'src/utils/password-crypt';
import { UpdateUserDto } from '../entities/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { idUser: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userExists = await this.userRepository.findOne({
      where: [
        {
          username: createUserDto.username,
        },
        { email: createUserDto.email },
      ],
    });
    if (userExists) {
      throw new BadRequestException('Username or email already exists.');
    }

    const cryptPassword = await hashPassword(createUserDto.password);
    createUserDto.password = cryptPassword;
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async update(
    idUser: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { idUser } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }
    this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(idUser: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { idUser } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
  }
}
