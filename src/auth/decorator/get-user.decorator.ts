import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const getUser = createParamDecorator((data,ctx:ExecutionContext)=>{

    const req = ctx.switchToHttp().getRequest();
    if(req.user){
        return req.user
    }
    throw new InternalServerErrorException('No user found')
})