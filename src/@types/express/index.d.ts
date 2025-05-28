import 'express';
import { File } from 'multer';

declare module 'express' {
  export interface Request {
    user?: any;
    file?: File;
    files?: File[];
  }
}
