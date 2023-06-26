import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @IsString()
  @ApiProperty({
    description: '项目名称',
  })
  readonly name: string;
  @IsString()
  @ApiProperty({
    description: '项目描述',
  })
  readonly desc: string;
  @IsInt()
  @ApiProperty({
    description: '项目类型',
  })
  readonly type: number;
}
