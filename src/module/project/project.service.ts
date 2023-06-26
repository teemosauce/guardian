import { Injectable, Scope } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable({
  scope: Scope.DEFAULT, // 默认从容器中获取的service实例只有一个，在整个app的生命周期里面共享
})
export class ProjectService {
  lastTime: number;
  constructor(
    @InjectRepository(Project) private readonly project: Repository<Project>,
  ) {}

  /**
   * 创建项目
   * @param createProjectDto 项目信息
   * @returns
   */
  create(createProjectDto: CreateProjectDto) {
    const project = new Project();
    project.name = createProjectDto.name;
    project.type = +createProjectDto.type;
    project.desc = createProjectDto.desc;
    return this.project.insert(project);
  }

  /**
   * 查询项目
   * @returns
   */
  findAll() {
    return this.project.findAndCount();
  }

  /**
   * 查询指定id的项目
   * @param id
   * @returns
   */
  async findOne(id: string) {
    return this.project.findOneBy({ id });
  }

  /**
   * 更新指定id的项目
   * @param id 项目id
   * @param updateProjectDto 更新信息
   * @returns
   */
  update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = new Project();
    project.name = updateProjectDto.name;
    project.desc = updateProjectDto.desc;
    return this.project.update({ id }, project);
  }

  /**
   * 删除指定项目
   * @param id 项目id
   * @returns
   */
  remove(id: string) {
    return this.project.softDelete(id);
  }
}
