import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateNotionRecordDto } from "./dto/create-notion-record.dto";
import { UpdateNotionRecordDto } from "./dto/update-notion-record.dto";
import { Client } from "@notionhq/client";

@Injectable()
export class NotionRecordsService {
  private notion: Client;
  private databaseId = process.env.DATABASE_ID;

  constructor() {
    this.notion = new Client({ auth: process.env.API_KEY });
  }

  async create() {
    const response = await this.notion.pages.create({
      parent: { database_id: this.databaseId },
      properties: {},
    });
    console.log("Page created with only required fields:", response);
  }

  async findOne(id: string) {
    const response = await this.notion.databases.query({
      database_id: this.databaseId,
      filter: {
        property: "ID",
        number: {
          equals: +id,
        },
      },
    });

    if (response.results.length > 0) {
      return response.results[0];
    } else {
      throw new NotFoundException(`Nenhum registro encontrado com o id: ${id}`);
    }
  }

  update(id: number, updateNotionRecordDto: UpdateNotionRecordDto) {
    return `This action updates a #${id} notionRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} notionRecord`;
  }
}
