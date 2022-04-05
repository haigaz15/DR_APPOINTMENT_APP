
import { AuthGuard } from '@nestjs/passport';


export class JwtAuthGuard1 extends AuthGuard(['strategy_jwt_1']) {  }
