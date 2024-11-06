import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { fromBuffer } from 'file-type/core';
import *  as fs from 'fs';


@Injectable()
export class 
StorageService{
  private storage_path: string;

  constructor(private configService: ConfigService) {
    this.storage_path = 'src/storage/';
  }

  async upload(file_name: string, file: Buffer):Promise<string>{
    const path = `${this.storage_path}/${file_name}`;
    const writeStream = fs.createWriteStream(`${this.storage_path}${file_name}`);
    writeStream.write(file);
    return `${path}`;
  }

  async delete(key: string):Promise<void> {
    console.log(key);
    return await fs.unlink(key, (err) => {
      if (err) {
       console.error(err);
       return err;
      }
     });
  }

  async get(key: string): Promise<any> {
    const path = `${this.storage_path}/${key}`;
    const ws = fs.createWriteStream(path);
    return `${ws}`;
  }

}
