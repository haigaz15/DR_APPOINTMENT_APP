
import { AuthGuard } from '@nestjs/passport';


export class JwtAuthGuard2 extends AuthGuard(['strategy_jwt_2']) {  }
