import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly users = [
    { username: 'admin', password: '123456' },
    { username: 'support', password: '123456' },
    { username: 'agency', password: '123456' },
    { username: 'user', password: '123456' },
  ];

  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, pass: string) {
    const user = this.users.find(
      (u) => u.username === username && u.password === pass
    );
    if (user) {
      return { username: user.username };
    }
    return null;
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign({ username: user.username }),
      role: user.username,
    };
  }
}
