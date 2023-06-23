import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ResponseReturn } from '../../utils/response.return';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<ResponseReturn> {
    const body = new ResponseReturn();
    let project;
    try {
      project = await this.projectService.create(createProjectDto);
    } catch (err) {
      return body.fail(err.message);
    }

    return body.success('创建成功').data(project);
  }

  @Get()
  async findAll(): Promise<any> {
    const body = new ResponseReturn();
    let projects, total;
    try {
      [projects, total] = await this.projectService.findAll();
    } catch (err) {
      return body.fail(err.message);
    }

    return body.success('查询成功').data({
      list: projects,
      total,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseReturn> {
    const body = new ResponseReturn();
    let project;
    try {
      project = await this.projectService.findOne(id);
    } catch (err) {
      return body.fail(err.message);
    }
    return body.success('查询成功').data(project);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ResponseReturn> {
    const body = new ResponseReturn();
    let data;
    try {
      data = await this.projectService.update(id, updateProjectDto);
    } catch (err) {
      return body.fail(err.message);
    }
    return body.success('更新成功').data(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseReturn> {
    const body = new ResponseReturn();
    try {
      await this.projectService.remove(id);
    } catch (err) {
      return body.fail(err.message);
    }
    return body.success('删除成功');
  }
}
