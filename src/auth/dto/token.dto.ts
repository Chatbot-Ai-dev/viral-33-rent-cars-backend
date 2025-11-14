import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiYWRtaW5AdmlyYWwzMy5tYSIsImlhdCI6MTcxNjM4ODk3MiwiZXhwIjoxNzE2MzkyNTcyfQ.SomeTokenValue',
    description: "Token d'accès JWT",
  })
  access_token: string;
}
