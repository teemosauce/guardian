import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default <TypeOrmModuleOptions>{
  type: 'mariadb',
  host: '192.168.1.10',
  port: 3306,
  database: 'guardian',
  username: 'mysqlAdmin',
  password: '123456',
  retryDelay: 1000, // 如果连接失败 每1s重连一次
  retryAttempts: 10, // 最多重连10次
  synchronize: true,
  autoLoadEntities: true,
  timezone: '+8:00',
  //   entityPrefix: 'guardian', // 表明公共头部
};
