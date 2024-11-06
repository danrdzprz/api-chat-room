import { Module } from '@nestjs/common';
import { StorageService } from './Storage.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ ConfigModule],
  providers: [StorageService],
  exports:[StorageService]
})
export class StorageModule {}