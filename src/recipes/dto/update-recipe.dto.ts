import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from 'src/recipes/dto';

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {}
