import { IsOptional, IsString, ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";
import PlannedDate from "./ValidationClasses/PlannedDate";
import ImageFile from "./ValidationClasses/ImageFile";

export class UpdateNotionRecordDto {
  @IsOptional()
  @IsString({ message: "O campo 'Company' deve ser uma string." })
  Company?: string;

  @IsOptional()
  @IsString({ message: "O campo 'Campaign' deve ser uma string." })
  Campaign?: string;

  @IsOptional()
  @IsString({ message: "O campo 'Description' deve ser uma string." })
  Description?: string;

  @IsOptional()
  @ValidateNested({
    message: "O campo 'PlannedDate' deve ser um objeto válido.",
  })
  @Type(() => PlannedDate)
  PlannedDate?: PlannedDate;

  @IsOptional()
  @IsString({ message: "O campo 'Where' deve ser uma string." })
  Where?: string;

  @IsOptional()
  @IsString({ message: "O campo 'Language' deve ser uma string." })
  Language?: string;

  @IsOptional()
  @IsString({ message: "O campo 'Content' deve ser uma string." })
  Content?: string;

  @IsOptional()
  @IsString({ message: "O campo 'ImageContent' deve ser uma string." })
  ImageContent?: string;

  @IsOptional()
  @ValidateNested({
    each: true,
    message: "Cada item em 'Image' deve ser um objeto válido.",
  })
  @Type(() => ImageFile)
  @IsArray({ message: "O campo 'Image' deve ser um array." })
  Image?: ImageFile[];
}
