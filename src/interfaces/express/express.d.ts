declare namespace Express {
  export interface Request {
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      bucket: string;
      key: string;
      acl: string;
      contentType: string;
      contentDisposition: null | string | number;
      contentEncoding: null | string | number;
      storageClass: string;
      serverSideEncryption: null | string | number;
      metadata: object | null;
      location: string;
      etag: string;
      versionId: undefined | number | string;
    };
  }
}
