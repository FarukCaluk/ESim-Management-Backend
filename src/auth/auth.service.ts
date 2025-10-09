import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // Example user array
  private readonly users = [
    { email: 'admin', password: '123456', role: 'admin' },
    { email: 'support', password: '123456', role: 'support' },
    { email: 'agency', password: '123456', role: 'agency' },
    { email: 'user', password: '123456', role: 'user' },
  ];

  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, pass: string) {
    const user = this.users.find(
      (u) => u.email === email && u.password === pass
    );
    if (user) {
      return user; // user now includes role
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
    };
  }
}
