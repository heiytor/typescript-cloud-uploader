import 'dotenv/config';
import { S3Client } from '@aws-sdk/client-s3';

export const S3Config = {
  S3: new S3Client({
    endpoint: process.env.ENDPOINT,
    forcePathStyle: false,
    region: process.env.REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID as string,
      secretAccessKey: process.env.ACCESS_KEY_SECRET as string,
    },
  }),
};
