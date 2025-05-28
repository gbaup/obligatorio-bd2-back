import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async signIn(username: string, pass: string): Promise<any> {}
}
