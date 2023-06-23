import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * 异常日志表
 */
@Entity({
  name: 'exception',
})
export class Exception {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'ID',
  })
  id: number;

  @Column({
    type: 'uuid',
    name: 'project_id',
    comment: '项目ID',
    nullable: false,
  })
  projectId: string;

  @Column({
    name: 'colno',
    type: 'int',
    unsigned: true,
    comment: '列号',
    default: 0,
  })
  colno: number;

  @Column({
    name: 'rowno',
    type: 'int',
    unsigned: true,
    comment: '行号',
    default: 0,
  })
  rowno: number;

  @Column({
    type: 'text',
    name: 'error',
    comment: '日志内容',
  })
  error: string;

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
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    comment: '最后更新时间',
  })
  updatedAt: Date;
}
