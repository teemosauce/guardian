import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

/**
 *项目表
 */
@Entity({
  name: 'project',
})
export class Project {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'ID',
  })
  @ApiProperty({
    description: '项目的ID',
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'name',
    comment: '项目名称',
    nullable: false,
  })
  @ApiProperty({
    description: '项目的名称',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 150,
    name: 'desc',
    comment: '项目描述',
  })
  @ApiProperty({
    description: '项目描述',
  })
  desc: string;

  @Column({
    type: 'tinyint',
    name: 'type',
    comment: '项目类型',
    unsigned: true,
    nullable: false,
  })
  @ApiProperty({
    description: '项目的所属类型 1(小程序) 2(H5) 3(Vue) 4(React)',
  })
  type: number;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    comment: '删除标志',
    select: false,
  })
  deletedAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    comment: '创建时间',
    update: false,
  })
  @ApiProperty({
    description: '项目的创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    comment: '最后更新时间',
  })
  @ApiProperty({
    description: '项目的最后修改时间',
  })
  updatedAt: Date;
}
