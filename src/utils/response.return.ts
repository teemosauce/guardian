import { ApiProperty } from '@nestjs/swagger';

export class ResponseReturn<T> {
  @ApiProperty({
    description: '消息说明',
  })
  msg?: string;

  @ApiProperty({
    description: '状态码',
  })
  code?: number;

  @ApiProperty({
    description: '状态',
    type: 'boolean',
  })
  success = true;

  data?: T;

  /**
   * 失败返回
   * @param msg 失败的信息
   * @returns
   */

  f(msg?: string): ResponseReturn<T> {
    this.success = false;
    this.msg = msg;
    return this;
  }
  /**
   * 成功返回
   * @param msg 成功的信息
   * @returns
   */

  s(msg?: string): ResponseReturn<T> {
    this.success = true;
    this.msg = msg;
    return this;
  }

  /**
   * 返回数据
   * @param data 返回的数据
   * @returns
   */
  d(data: any): ResponseReturn<T> {
    this.data = data;
    return this;
  }
  /**
   * 返回的状态码
   * @param code
   * @returns
   */
  c(code: number): ResponseReturn<T> {
    this.code = code;
    return this;
  }

  toJSON() {
    return {
      code: this.code,
      msg: this.msg,
      data: this.data,
      success: this.success,
    };
  }
}

export type PromiseResponseReturn<T> = Promise<ResponseReturn<T>>;
