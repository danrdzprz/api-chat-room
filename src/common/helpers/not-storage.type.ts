import { StoredFile } from 'nestjs-form-data/dist/classes/storage';
import { FormDataInterceptorConfig } from 'nestjs-form-data/dist/interfaces/FormDataInterceptorConfig';
import { Readable as ReadableStream } from 'stream';
import { ParticleStoredFile } from 'nestjs-form-data/dist/interfaces/ParticleStoredFile';
import { plainToClass } from 'class-transformer';

export class NotStoredFile extends StoredFile {
  size: number;
  buffer: Buffer;

  static async create(busboyFileMeta: ParticleStoredFile, stream: ReadableStream, config: FormDataInterceptorConfig): Promise<NotStoredFile> {
    return new Promise<NotStoredFile>((res, rej) => {
      let size: number = 0;
      let chunks: Buffer[]= [];
      stream.on('data', async (chunk: Buffer) => { 
        chunks.push(chunk);
        size += chunk.length
      });
      // stream.on('finish', () => {
      //   const file: NotStoredFile = plainToClass(NotStoredFile, {
      //     originalName: busboyFileMeta.originalName,
      //     encoding: busboyFileMeta.encoding,
      //     busBoyMimeType: busboyFileMeta.mimetype,
      //     buffer: Buffer.concat(chunks),
      //     size,
      //   });

      //   res(file);
      // });

      stream.on('end', () => {
        const file: NotStoredFile = plainToClass(NotStoredFile, {
          originalName: busboyFileMeta.originalName,
          encoding: busboyFileMeta.encoding,
          busBoyMimeType: busboyFileMeta.mimetype,
          buffer: Buffer.concat(chunks),
          size,
        });

        res(file);
      });
      stream.on('error', (rej)=>{console.log(rej)});
    });
  }

  delete(): Promise<void> {
    return Promise.resolve(undefined);
  }

}