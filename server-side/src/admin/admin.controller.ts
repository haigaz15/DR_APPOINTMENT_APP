import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('admin/2__')
export class AdminController {
    constructor(private adminSerice:AdminService) {}

    @Post()
    createAdmin(@Body() createAdminDto:CreateAdminDto):Promise<String>{
        return this.adminSerice.createAdmin(createAdminDto);
    }
    
}
