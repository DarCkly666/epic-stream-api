import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        // Aquí se maneja cualquier error que ocurra en el flujo
        if (error instanceof HttpException) {
          // Si el error es una excepción HTTP, lo reenvías
          return throwError(() => new Error(error.message));
        }

        // Si es un error genérico, lanza una nueva HttpException
        const httpException = new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Algo salió mal, por favor intenta nuevamente.',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
        return throwError(() => new Error(httpException.message));
      }),
    );
  }
}
