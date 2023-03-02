import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const host = config.get<string>('MONGO_HOSTNAME');
        const port = config.get<string>('MONGO_PORT');
        const db = config.get<string>('MONGO_DB');
        const env = config.get<string>('NODE_ENV');
        //const uri = `mongodb://${user}:${pws}@${host}:${port}/${db}`; // Loaded from .ENV
        const uri = `mongodb://${host}:${port}/${db}`;
        console.log('URL-:', uri, env,);
        return { uri };
      }
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {


  constructor(private usersService: UsersService) {
    usersService.findByOne('admin@mail.com').then((res) => {
      if (res === null) {
        console.log('ADMIN created');

        usersService.createUser({
          fullname: "admin",
          email: "admin@mail.com",
          birth: "07-08-1991",
          role: 1,
          password: "admin"

        })
      } else {
        console.log('ADMIN already exits')
      };

    }).catch((error) =>
      console.log
    )
  }
}
