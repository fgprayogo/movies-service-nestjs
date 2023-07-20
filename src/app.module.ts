import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IndexModule } from './modules/index.module';

@Module({
  imports: [
    // .env config
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    IndexModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
