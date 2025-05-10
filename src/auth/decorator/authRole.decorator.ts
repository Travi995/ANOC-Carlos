import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roleprotected, ValidRoles } from "./roleprotected.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "../guards/userRole.guard";


export function AuthRole(...roles: ValidRoles[]) {

    return applyDecorators(
        Roleprotected(...roles),
        UseGuards(AuthGuard('jwt'),UserRoleGuard)
    )
}