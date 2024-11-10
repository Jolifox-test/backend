import { PartialType } from "@nestjs/mapped-types";
import { CreateNotionRecordDto } from "./create-notion-record.dto";

export class UpdateNotionRecordDto extends PartialType(CreateNotionRecordDto) {}
