import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from '../../../common/utils/pagination-response.dto';
import { User } from 'src/schemas/user.schema';
export class PaginationUserDto extends PaginationResponse {
    @ApiProperty({description: 'Usuarios', example: [
        {
            "_id": "6332372802bbeb73a172b2e2",
            "name": "Daniel",
            "email": "daniel@email.com"
        }    
    ]})
    data: User[];
}
