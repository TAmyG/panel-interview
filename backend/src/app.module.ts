import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WildfireModule } from './wildfire/wildfire.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WildfireModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // debug: false,
      // playground: false,
      cache: 'bounded',
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true, //Sort schema lexicographically
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
