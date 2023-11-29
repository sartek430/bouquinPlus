import { Body, Controller, Delete, Get, Param, Patch, PlainLiteralObject, Post } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: PlainLiteralObject) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Post('search')
  search(@Body() query: PlainLiteralObject) {
    return this.booksService.search(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: PlainLiteralObject) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}