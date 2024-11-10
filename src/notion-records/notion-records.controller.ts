import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { NotionRecordsService } from "./notion-records.service";
import { CreateNotionRecordDto } from "./dto/create-notion-record.dto";
import { UpdateNotionRecordDto } from "./dto/update-notion-record.dto";

@Controller("notion-records")
export class NotionRecordsController {
  constructor(private readonly notionRecordsService: NotionRecordsService) {}

  @Post()
  create(@Body() createNotionRecordDto: CreateNotionRecordDto) {
    return this.notionRecordsService.create(createNotionRecordDto);
  }

  @Get()
  findAll() {
    return this.notionRecordsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.notionRecordsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateNotionRecordDto: UpdateNotionRecordDto,
  ) {
    return this.notionRecordsService.update(+id, updateNotionRecordDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.notionRecordsService.remove(+id);
  }
}
