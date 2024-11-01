import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { validationOptions } from './config/validatior-options';
import { MongooseExceptionFilter } from './common/helpers/exceptions/database-exception';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';

const PORT = parseInt(process.env.APP_PORT, 10) || 4000;

const options = new DocumentBuilder()
  .setTitle('Chat Room')
  .setDescription('Chat Room')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe({}));
  app.enableVersioning({ type: VersioningType.URI });
  app.use(helmet());
  app.use(compression());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(validationOptions);
  app.useGlobalFilters(new MongooseExceptionFilter());
  app.useGlobalGuards(new JwtAuthGuard(new Reflector));

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);

  await app.listen(PORT, () => {
    console.log(`🚀 Application running at port ${PORT}`);
  });
}
bootstrap();
