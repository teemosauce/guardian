import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiResponseOptions,
  getSchemaPath,
  ApiResponse,
  ApiExtraModels,
} from '@nestjs/swagger';
import { Pagination } from '../utils/page';
import { ResponseReturn } from '../utils/response.return';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const ResponseFactory = (
  options: ApiResponseOptions,
  data: SchemaObject | ReferenceObject,
) => {
  return ApiResponse({
    ...options,
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseReturn) },
        {
          properties: {
            data,
          },
        },
      ],
    },
  });
};

/**
 * 返回带分页的列表信息
 * @param options
 * @returns
 */
export const ApiResponsePagination = <TModel extends Type<any>>(
  mode: TModel,
  options?: ApiResponseOptions,
) => {
  return applyDecorators(
    ApiExtraModels(mode), // 记得这里要把模型额外导入
    ResponseFactory(options, {
      allOf: [
        { $ref: getSchemaPath(Pagination) },
        {
          properties: {
            list: {
              type: 'array',
              items: {
                $ref: getSchemaPath(mode),
              },
            },
          },
        },
      ],
    }),
  );
};

/**
 * 返回列表信息
 * @param options
 * @returns
 */
export const ApiResponseList = <TModel extends Type<any>>(
  mode: TModel,
  options?: ApiResponseOptions,
) => {
  return applyDecorators(
    ApiExtraModels(mode),
    ResponseFactory(options, {
      type: 'array',
      items: {
        $ref: getSchemaPath(mode),
      },
    }),
  );
};

/**
 * 返回对象信息
 * @param mode
 * @returns
 */
export const ApiResponseObject = <TModel extends Type<any>>(
  mode: TModel,
  options?: ApiResponseOptions,
) => {
  return applyDecorators(
    ApiExtraModels(mode),
    ResponseFactory(options, { $ref: getSchemaPath(mode) }),
  );
};

/**
 * 其它类型的返回信息
 * @param options
 * @returns
 */
const ApiResponseAny = <TModel extends number | string | boolean | null>(
  mode?: TModel,
  options?: ApiResponseOptions,
) => {
  return applyDecorators(
    ResponseFactory(options, {
      type: typeof mode,
      default: mode,
    }),
  );
};

export const ApiResponseNull = (options?: ApiResponseOptions) => {
  return ApiResponseAny(null, options);
};

export const ApiResponseString = (options?: ApiResponseOptions) => {
  return ApiResponseAny('', options);
};

export const ApiResponseNumber = (options?: ApiResponseOptions) => {
  return ApiResponseAny(0, options);
};

export const ApiResponseBoolean = (options?: ApiResponseOptions) => {
  return ApiResponseAny(true, options);
};
