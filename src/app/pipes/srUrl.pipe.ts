import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 's3Url'
})
export class S3UrlPipe implements PipeTransform {
  transform(uri: string): string {
    return uri.replace('s3://', 'https://s3.amazonaws.com/');
  }
}
