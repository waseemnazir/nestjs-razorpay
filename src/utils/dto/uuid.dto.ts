import { IsOptional, IsUUID } from 'class-validator';

export class uuidDTO {
  @IsOptional()
  @IsUUID('4', { message: 'Invalid UUID format' })
  categoryId: string;
}
