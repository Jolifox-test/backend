import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateNotionRecordDto } from "./dto/create-notion-record.dto";
import { UpdateNotionRecordDto } from "./dto/update-notion-record.dto";
import { Client } from "@notionhq/client";
import utils from "../utils/utils";

@Injectable()
export class NotionRecordsService {
  private readonly notion = new Client({ auth: process.env.API_KEY });
  private readonly databaseId = process.env.DATABASE_ID;

  handlePropreties(record: CreateNotionRecordDto | UpdateNotionRecordDto) {
    const properties: any = {};

    for (const [key, value] of Object.entries(record)) {
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

    return properties;
  }

  async create(createNotionRecordDto: CreateNotionRecordDto) {
    const properties = this.handlePropreties(createNotionRecordDto);

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
      return response.results;
    } else {
      throw new NotFoundException(`Nenhum registro encontrado com o id: ${id}`);
    }
  }

  async update(id: string, updateNotionRecordDto: UpdateNotionRecordDto) {
    const existingRecord = (await this.findOne(id))[0];

    const properties = this.handlePropreties(updateNotionRecordDto);

    try {
      await this.notion.pages.update({
        page_id: existingRecord.id,
        properties,
      });
    } catch (error) {
      utils.treatUnexpectedError(error);
    }
  }

  async remove(id: string) {
    const existingRecord = await this.findOne(id);

    try {
      for (const page of existingRecord) {
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
