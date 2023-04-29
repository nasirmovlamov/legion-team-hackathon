import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ActionsModule } from './actions/actions.module';
import { Permission } from './permissions/entities/permission.entity';
import { Role } from './roles/entities/role.entity';
import { Tag } from './tags/entities/tag.entity';
import { Category } from './categories/entities/category.entity';
import { Blog } from './blogs/entities/blog.entity';
import { DataSource } from 'typeorm';
import { Action } from './actions/entities/action.entity';
import { BlogsModule } from './blogs/blogs.module';
import { TagsModule } from './tags/tags.module';
import { CategoriesModule } from './categories/categories.module';
import { MerchantsModule } from './merchants/merchants.module';
import { PublishersModule } from './publishers/publishers.module';
import { SellerAuthorsModule } from './seller-authors/seller-authors.module';
import { BooksModule } from './books/books.module';
import { SwapsModule } from './swaps/swaps.module';
import { CategoryUser } from './user-categories/entities/user-category.entity';
import { CategoryBook } from './book-categories/entities/category.entity';
import { CategoriesBookModule } from './book-categories/categories.module';
import { CategoriesUserModule } from './user-categories/categories.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'postgres',
      entities: [
        Tag,
        Category,
        Blog,
        Action,
        Permission,
        Role,
        User,
        CategoryUser,
        CategoryBook,
      ],
      synchronize: true,
      dropSchema: true,
    }),
    UsersModule,
    CategoriesBookModule,
    CategoriesUserModule,
    AuthModule,
    ConfigModule.forRoot(),
    RolesModule,
    PermissionsModule,
    ActionsModule,
    BlogsModule,
    TagsModule,
    CategoriesModule,
    MerchantsModule,
    PublishersModule,
    SellerAuthorsModule,
    BooksModule,
    SwapsModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
