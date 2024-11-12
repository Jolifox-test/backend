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
    const properties: any = {};

    for (const [key, value] of Object.entries(createNotionRecordDto)) {
      if (value !== undefined) {
        switch (key) {
          case "Company":
            properties.Company = {
              title: [{ text: { content: value } }],
            };
            break;
          case "ImageContent":
            properties["image content"] = {
              rich_text: [{ text: { content: value } }],
            };
            break;
          case "Campaign":
          case "Description":
          case "Content":
          case "Where":
            properties[key] = {
              rich_text: [{ text: { content: value } }],
            };
            break;
          case "Language":
            properties.Language = {
              select: { name: value },
            };
            break;
          case "PlannedDate":
            properties.PlannedDate = {
              date: {
                start: value.start,
                end: value.end ?? null,
              },
            };
            break;
          case "Image":
            properties.Image = {
              files: value.map((file: any) => ({
                type: file.type,
                name: file.name,
                ...(file.type === "external"
                  ? { external: { url: file.external } }
                  : { file: { url: file.file } }),
              })),
            };
            break;
          default:
            console.warn(`Unhandled property: ${key}`);
        }
      }
    }

    try {
      await this.notion.pages.create({
        parent: { database_id: this.databaseId },
        properties,
      });
    } catch (error) {
      utils.treatUnexpectedError(error);
    }
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
        await this.notion.pages.update({
          page_id: page.id,
          archived: true,
        });
      }
      return `Registro com o id: ${id} foi excluído com sucesso.`;
    } catch (error) {
      utils.treatUnexpectedError(error);
    }
  }
}
