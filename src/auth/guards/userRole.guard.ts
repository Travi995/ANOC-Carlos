import { Length } from 'class-validator';
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ValidRoles } from '../decorator/roleprotected.decorator';
import { UserEntity } from 'src/user/entities/user.entity';



@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private readonly reflector:Reflector
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const validRoles:string[] = this.reflector.get('roles', context.getHandler());
    console.log(validRoles)
    if(!validRoles) return true

    if(validRoles.length === 0) return true

    const user:UserEntity =  context.switchToHttp().getRequest().user;
    console.log(user)
    
    if(!user) throw new BadRequestException('No user found')

    if(user.rol === validRoles[0]) return true
    
    throw new ForbiddenException(`verifica el rol no tien permisos para esta ruta`)
  }
}
