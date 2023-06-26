import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  PromiseResponseReturn,
  ResponseReturn,
} from '../../utils/response.return';
import { Project } from './entities/project.entity';
import { Pagination } from '../../utils/page';
import {
  ApiResponseNull,
  ApiResponseObject,
  ApiResponsePagination,
} from 'src/decorator/api-response-return';

@ApiBearerAuth()
@ApiTags('project')
@ApiExtraModels(ResponseReturn, Pagination)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiOperation({ summary: '查询全部项目' })
  @ApiResponsePagination(Project, {
    description: '项目列表及总数',
  })
  async findAll(): PromiseResponseReturn<Pagination<Project>> {
    if (!this.projectService.lastTime) {
      this.projectService.lastTime = Date.now();
    }

    console.log(this.projectService.lastTime);
    const body = new ResponseReturn<Pagination<Project>>();
    let projects, total;
    try {
      [projects, total] = await this.projectService.findAll();
    } catch (err) {
      return body.f(err.message);
    }

    return body.s('查询成功').d({
      list: projects,
      total,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: '查询指定项目' })
  @ApiResponseObject(Project, {
    description: '项目信息',
  })
  async findOne(@Param('id') id: string): PromiseResponseReturn<Project> {
    const body = new ResponseReturn<Project>();
    let project;
    try {
      project = await this.projectService.findOne(id);
    } catch (err) {
      return body.f(err.message);
    }
    return body.s('查询成功').d(project);
  }

  @Post()
  @ApiOperation({ summary: '创建项目' })
  @ApiResponseObject(Project, {
    description: '添加的项目信息',
  })
  async create(
    @Body() createProjectDto: CreateProjectDto,
  ): PromiseResponseReturn<Project> {
    const body = new ResponseReturn<Project>();
    let project;
    try {
      project = await this.projectService.create(createProjectDto);
    } catch (err) {
      return body.f(err.message);
    }

    return body.s('创建成功').d(project);
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改指定项目' })
  @ApiResponseObject(Project, {
    description: '修改后的项目信息',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ResponseReturn<any>> {
    const body = new ResponseReturn();
    let data;
    try {
      data = await this.projectService.update(id, updateProjectDto);
    } catch (err) {
      return body.f(err.message);
    }
    return body.s('更新成功').d(data);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除指定项目' })
  @ApiResponseNull({
    description: '删除的状态',
  })
  async remove(@Param('id') id: string): PromiseResponseReturn<null> {
    const body = new ResponseReturn<null>();
    try {
      await this.projectService.remove(id);
    } catch (err) {
      return body.f(err.message);
    }
    return body.s('删除成功');
  }
}
