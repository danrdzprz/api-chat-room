import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import *  as fs from 'fs';
import { basename } from 'path';


@Injectable()
export class 
StorageService{
  private storage_path: string;
  private url_path: string;
  private app_url: string;

  constructor(private configService: ConfigService) {
    this.storage_path = 'src/public/images/';
    this.url_path = '/images/';
    this.app_url = this.configService.get<string>('app_url');
  }

  async upload(file_name: string, file: Buffer):Promise<string>{
    const path = `${this.storage_path}${file_name}`;
    const writeStream = fs.createWriteStream(path);
    writeStream.write(file);
    return `${path}`;
  }

  async delete(key: string):Promise<void> {
    return await fs.unlink(key, (err) => {
      if (err) {
       return err;
      }
     });
  }

  async get(key: string): Promise<any> {
    const path = `${this.storage_path}/${key}`;
    const ws = fs.createWriteStream(path);
    return ws;
  }

  async getUrl(key: string): Promise<string> {
    return `${this.app_url}${this.url_path}${basename(key)}`;
  }

}
