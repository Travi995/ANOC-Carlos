import { SetMetadata } from '@nestjs/common';

export enum ValidRoles{
    ADMIN = 'ADMIN',
    USER = 'USER',
    ASOCIATE= 'ASOCIATE',
    GESTOR ="GESTOR"
}


export const Roleprotected = (...args: ValidRoles[]) => SetMetadata('roleprotected', args);
