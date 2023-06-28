import { IsEnum } from 'class-validator';
import { Roles } from '../../shared/types/roles';

export class UpdateUserRoleDto {
  @IsEnum(Roles, { each: true })
  roles: Roles[];
}
