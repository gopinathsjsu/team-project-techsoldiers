import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { PrismaService } from './services/prisma.service';

global['fetch'] = require('node-fetch');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true});
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3030);
}
bootstrap();
