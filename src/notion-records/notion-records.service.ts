import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateNotionRecordDto } from "./dto/create-notion-record.dto";
import { UpdateNotionRecordDto } from "./dto/update-notion-record.dto";
import { Client } from "@notionhq/client";
import utils from "../utils/utils";

@Injectable()
export class NotionRecordsService {
  private readonly notion: Client;
  private readonly databaseId = process.env.DATABASE_ID;

  constructor() {
    this.notion = new Client({ auth: process.env.API_KEY });
  }

  async create(createNotionRecordDto: CreateNotionRecordDto) {
    // const response = await this.notion.pages.create({
    //   parent: { database_id: this.databaseId },
    //   properties: {},
    // });
    // console.log("Page created with only required fields:", response);
    return "test";
  }

  async findOne(id: string) {
    let response: any;

    try {
      response = await this.notion.databases.query({
        database_id: this.databaseId,
        filter: {
          property: "ID",
          number: {
            equals: +id,
          },
        },
      });
    } catch (error) {
      utils.treatUnexpectedError(error);
    }

    if (response.results.length > 0) {
      return response.results[0];
    } else {
      throw new NotFoundException(`Nenhum registro encontrado com o id: ${id}`);
    }
  }

  update(id: number, updateNotionRecordDto: UpdateNotionRecordDto) {
    return `This action updates a #${id} notionRecord`;
  }

  async remove(id: number) {
    let response: any;

    try {
      response = await this.notion.databases.query({
        database_id: this.databaseId,
        filter: {
          property: "ID",
          number: {
            equals: id,
          },
        },
      });
    } catch (error) {
      utils.treatUnexpectedError(error);
    }

    if (response.results.length === 0) {
      throw new NotFoundException(
        `Nenhum registro com o id: ${id} foi encontrado!`,
      );
    }

    try {
      for (const page of response.results) {
        const pageId = page.id;
        await this.notion.pages.update({
          page_id: pageId,
          archived: true,
        });
      }
      return `Registro com o id: ${id} foi excluído com sucesso.`;
    } catch (error) {
      utils.treatUnexpectedError(error);
    }
  }
}
