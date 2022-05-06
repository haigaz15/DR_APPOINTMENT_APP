import { AuthGuard } from '@nestjs/passport';


export class JwtAuthGuard3 extends AuthGuard(['strategy_jwt_3']) {  }
