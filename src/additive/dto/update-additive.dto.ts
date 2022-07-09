import { PartialType } from '@nestjs/mapped-types';
import { CreateAdditiveDto } from './create-additive.dto';

export class UpdateAdditiveDto extends PartialType(CreateAdditiveDto) {}
