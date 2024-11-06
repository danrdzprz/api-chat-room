import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import databaseConfig from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { ChatRoomsModule } from './modules/chat-rooms/chat-rooms.module';
import { MessagesModule } from './modules/messages/messages.module';
import * as path from 'path';
import { SocketsGateway } from './sockets/sockets.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

console.log(join(__dirname, '..', 'src/public'));
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/public'),
    }),
    // MongooseModule.forRoot(mongodb_url),
    I18nModule.forRoot({
      fallbackLanguage: 'es',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        // useCreateIndex: true,
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        uri: configService.get<string>('mongodb.uri'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ChatRoomsModule,
    MessagesModule
  ],
  controllers: [AppController],
  providers: [AppService, SocketsGateway],
})
export class AppModule {}
