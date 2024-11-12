import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsDateString,
  IsArray,
  IsIn,
} from "class-validator";
import { Type } from "class-transformer";

class ImageFile {
  @IsNotEmpty({
    message: " O campo 'type' é obrigatório e deve ser 'external' ou 'file'.",
  })
  @IsIn(["external", "file"], {
    message: " O campo 'type' deve ser 'external' ou 'file'.",
  })
  type: "external" | "file";

  @IsString({ message: " O campo 'name' deve ser uma string." })
  name: string;

  @IsOptional()
  @IsString({ message: " O campo 'external' deve ser uma string." })
  external?: { url: string };

  @IsOptional()
  @IsString({ message: " O campo 'file' deve ser uma string." })
  file?: { url: string };
}

class PlannedDate {
  @IsDateString(
    {},
    { message: " O campo 'start' deve ser uma data no formato ISO 8601." },
  )
  start: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: " O campo 'end' deve ser uma data no formato ISO 8601." },
  )
  end?: string;
}

export class CreateNotionRecordDto {
  @IsNotEmpty({ message: "O campo 'Company' é obrigatório." })
  @IsString({ message: "O campo 'Company' deve ser uma string." })
  Company: string;

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
