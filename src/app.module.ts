import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { WorkersModule } from './workers/workers.module';
import { SalesModule } from './sales/sales.module';
import { ProviderModule } from './provider/provider.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'cacaoDB',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProductsModule,
    WorkersModule,
    SalesModule,
    ProviderModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
