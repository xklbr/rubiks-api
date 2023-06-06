import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreDto } from 'src/stores/dto';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {}
