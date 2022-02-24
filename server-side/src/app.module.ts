import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { HospitalModule } from './hospital/hospital.module';
import { SectionModule } from './section/section.module';
import { DoctorModule } from './doctor/doctor.module';


@Module({

  imports: [UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Root++',
      database: 'UsersDB',
      autoLoadEntities:true,
      //synchronize: true
    }),
    HospitalModule,
    SectionModule,
    DoctorModule,
    
],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
