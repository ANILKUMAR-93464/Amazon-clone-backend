// src/modules/users/exceptions/invalid-token.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidTokenException extends HttpException {
  constructor() {
    super('Invalid or expired verification token', HttpStatus.BAD_REQUEST);
  }
}