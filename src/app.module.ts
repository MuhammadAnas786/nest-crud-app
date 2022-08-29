import { Module, } from '@nestjs/common';
import { PhotosModule } from './photos/photos.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from "@hapi/joi"
import { DBSchema } from './dbSchema';
import { DataBaseModule } from './database.module';
import AuthenticationModule from './userAuthentication/authentication.module';


@Module({
  imports: [
    PhotosModule,
    AuthenticationModule,
    ConfigModule.forRoot(
      {
        validationSchema:DBSchema
      }
    ),
    DataBaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
