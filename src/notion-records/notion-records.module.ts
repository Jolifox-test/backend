import { Module } from "@nestjs/common";
import { NotionRecordsService } from "./notion-records.service";
import { NotionRecordsController } from "./notion-records.controller";

@Module({
  controllers: [NotionRecordsController],
  providers: [NotionRecordsService],
})
export class NotionRecordsModule {}
