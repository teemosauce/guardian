import { ApiProperty } from '@nestjs/swagger';

export class Pagination<T> {
  @ApiProperty({
    description: '总数目',
  })
  total: number;
  @ApiProperty({
    description: '列表数据',
  })
  list: [T];
}
