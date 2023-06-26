import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ExceptionService } from './exception.service';
import { CreateExceptionDto } from './dto/create-exception.dto';
import {
  PromiseResponseReturn,
  ResponseReturn,
} from 'src/utils/response.return';
import { Exception } from './entities/exception.entity';
import { Pagination } from 'src/utils/page';

@Controller('exception')
export class ExceptionController {
  constructor(private readonly exceptionService: ExceptionService) {}

  @Post()
  @HttpCode(204)
  create(@Body() createExceptionDto: CreateExceptionDto) {
    if (createExceptionDto.appId) {
      this.exceptionService
        .create(createExceptionDto)
        .then(() => {
          console.log('执行创建，并且不返回内容');
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // 后续把这里的创建任务放入消息队列
  }

  @Get()
  async findAll(): PromiseResponseReturn<Pagination<Exception>> {
    const body = new ResponseReturn<Pagination<Exception>>();
    let exceptions, total;
    try {
      [exceptions, total] = await this.exceptionService.findAll();
    } catch (err) {
      return body.f(err.message);
    }

    return body.s('查询成功').d({
      list: exceptions,
      total,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const body = new ResponseReturn();
    let exception;
    try {
      exception = await this.exceptionService.findOne(+id);
    } catch (err) {
      return body.f(err.message);
    }
    return body.s('查询成功').d(exception);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const body = new ResponseReturn();
    try {
      await this.exceptionService.remove(+id);
    } catch (err) {
      return body.f(err.message);
    }
    return body.s('删除成功');
  }
}
