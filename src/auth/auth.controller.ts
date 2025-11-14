import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: "Connecter un utilisateur et obtenir un token JWT" })
  @ApiResponse({ status: 200, description: 'Connexion réussie, retourne un token JWT.', type: TokenDto })
  @ApiResponse({ status: 401, description: 'Identifiants invalides.' })
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }

  @Post('register')
  @ApiOperation({ summary: "Inscrire un nouvel utilisateur (admin)" })
  // FIX: Replaced Omit<User, 'password'> with User as Omit is a type and not a value.
  @ApiResponse({ status: 201, description: "L'utilisateur a été créé avec succès.", type: User })
  @ApiResponse({ status: 409, description: 'Cet email est déjà enregistré.' })
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
}
