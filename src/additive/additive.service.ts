import { Injectable } from '@nestjs/common';
import { CreateAdditiveDto } from './dto/create-additive.dto';
import { UpdateAdditiveDto } from './dto/update-additive.dto';

@Injectable()
export class AdditiveService {
  create(createAdditiveDto: CreateAdditiveDto) {
    return 'This action adds a new additive';
  }

  findAll() {
    return `This action returns all additive`;
  }

  findOne(id: number) {
    return `This action returns a #${id} additive`;
  }

  update(id: number, updateAdditiveDto: UpdateAdditiveDto) {
    return `This action updates a #${id} additive`;
  }

  remove(id: number) {
    return `This action removes a #${id} additive`;
  }
}
