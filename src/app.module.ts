import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { NotionRecordsModule } from "./notion-records/notion-records.module";
import { NotionRecordsModule } from "./notion-records/notion-records.module";

@Module({
  imports: [NotionRecordsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
