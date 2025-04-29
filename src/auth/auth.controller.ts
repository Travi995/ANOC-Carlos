import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/register.dto';
import { LoginAuthDTO} from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @HttpCode(200)
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDTO) {
    return this.authService.login(loginAuthDto);
  }

}
