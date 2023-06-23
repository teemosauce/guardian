export class ResponseReturn {
  #msg?: string;
  #code?: number;
  #success = true;
  #data?: any = null;

  /**
   * 失败返回
   * @param msg 失败的信息
   * @returns
   */
  fail(msg?: string): ResponseReturn {
    this.#success = false;
    this.#msg = msg;
    return this;
  }
  /**
   * 成功返回
   * @param msg 成功的信息
   * @returns
   */
  success(msg?: string): ResponseReturn {
    this.#success = true;
    this.#msg = msg;
    return this;
  }

  /**
   * 返回数据
   * @param data 返回的数据
   * @returns
   */
  data(data: any): ResponseReturn {
    this.#data = data;
    return this;
  }
  /**
   * 返回的状态码
   * @param code
   * @returns
   */
  code(code: number): ResponseReturn {
    this.#code = code;
    return this;
  }

  toJSON() {
    return {
      code: this.#code,
      msg: this.#msg,
      data: this.#data,
      success: this.#success,
    };
  }
}
