import { Injectable } from "@nestjs/common";
import { CreateNotionRecordDto } from "./dto/create-notion-record.dto";
import { UpdateNotionRecordDto } from "./dto/update-notion-record.dto";

@Injectable()
export class NotionRecordsService {
  create(createNotionRecordDto: CreateNotionRecordDto) {
    return "This action adds a new notionRecord";
  }

  findAll() {
    return `This action returns all notionRecords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notionRecord`;
  }

  update(id: number, updateNotionRecordDto: UpdateNotionRecordDto) {
    return `This action updates a #${id} notionRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} notionRecord`;
  }
}
