import { UseInterceptors, ClassSerializerInterceptor } from "@nestjs/common";

export function Serialize(){
    return UseInterceptors(ClassSerializerInterceptor)
}