import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser"
import ExceptionLoggerFilter from "./utils/exceptionsLogger.filter";
import { ValidationPipe } from "@nestjs/common";

const bootstrap = async() =>{
  let server = await NestFactory.create(AppModule);
  server.use(cookieParser())
  const { httpAdapter } = server.get(HttpAdapterHost)
  server.useGlobalFilters(new ExceptionLoggerFilter(httpAdapter))
  server.useGlobalPipes(new ValidationPipe());
  await server.listen(process.env.PORT||3000);
  console.log("server started")
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();