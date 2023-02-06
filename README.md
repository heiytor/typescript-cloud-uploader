<h1 align="center">Cloud uploader middleware</h1>

A middleware for uploading files to cloud services.

## Features
* Dynamically allows only specific file types.
* Dinamically limits file size.
* Set the content-type dinamically.
* Upload files to a specified S3 bucket, DigitalOcean space or any cloud service that connects with multer-S3.
* Add random buffer and timestamp to the file key to generate a unique URL.
* Sets the ACL of the uploaded file to 'public-read' or 'private'.
* Upload a single file or a array of files.

## Methods
* `fileFilter`: A function that checks the MIME type of an uploaded file and returns an error if the type is not in the ALLOWED_TYPES array.
* `storage`: A function that returns an instance of the Multer S3 storage engine, configured with the properties of the class.
* `limits`: A function that returns an object that sets the maximum size of uploaded files.
* `setupUpload`: A function that sets up an instance of the Multer library with the fileFilter, storage, and limits functions as parameters.
* `handle`: A method that uses the setupUpload function to handle file uploads for a single file or a array of files in an Express.js application.

## Usage
To use the FileUploaderMiddleware in an Express.js or similar application, you can instantiate the class with the desired "ALLOWED_TYPES", "MAX_FILE_SIZE", and "BUCKET" properties and then use the handle method as middleware in your route. For example:
```javascript
import { Request, Response, NextFunction, Router } from 'express';
import { FileUploaderMiddleware } from './path/to/middleware';

const ALLOWED_TYPES = ['image/png', 'image/jgp', 'image/jgep']; // Content-type here
const MAX_FILE_SIZE_IN_MB = 7 * 1024 ** 2; // Note that you only need to change the first number
const BUCKET = process.env.BUCKET as string;
const fileUploaderMiddleware = new FileUploaderMiddleware(ALLOWED_TYPES, MAX_FILE_SIZE_IN_MB, BUCKET);

app.post('/upload/file',
  (req: Request, res: Response, next: NextFunction) => {
    return fileUploaderMiddleware.handle(req, res, next);
  },
  (req: Request, res: Response) => {
  // Your code to handle the uploaded file.
  },
);
```
You can also use the FilesUploaderController to upload multiple files at once.

**An full usage example is available in `src/sample`.**

## Response