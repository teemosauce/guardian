import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

type ProjectType = '小程序' | 'H5' | 'REACT' | 'VUE';

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
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'name',
    comment: '项目名称',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 150,
    name: 'desc',
    comment: '项目描述',
  })
  desc: string;

  @Column({
    type: 'tinyint',
    name: 'type',
    comment: '项目类型',
    unsigned: true,
    nullable: false,
  })
  type: ProjectType;

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
