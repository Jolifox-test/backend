import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import PlannedDate from "./ValidationClasses/PlannedDate";
import ImageFile from "./ValidationClasses/ImageFile";

export class CreateNotionRecordDto {
  @ApiProperty({
    description: "Nome da empresa associado ao registro.",
    example: "Tech Company",
    required: true,
  })
  @IsNotEmpty({ message: "O campo 'Company' é obrigatório." })
  @IsString({ message: "O campo 'Company' deve ser uma string." })
  Company: string;

  @ApiProperty({
    description: "Campanha associada ao registro (opcional).",
    example: "Summer Campaign",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "O campo 'Campaign' deve ser uma string." })
  Campaign?: string;

  @ApiProperty({
    description: "Descrição do registro (opcional).",
    example: "Descrição da campanha de verão.",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "O campo 'Description' deve ser uma string." })
  Description?: string;

  @ApiProperty({
    description: "Data planejada do registro (opcional).",
    type: PlannedDate,
    required: false,
    example: { start: "12/12/2022", end: "14/12/2022" },
  })
  @IsOptional()
  @ValidateNested({
    message: "O campo 'PlannedDate' deve ser um objeto válido.",
  })
  @Type(() => PlannedDate)
  PlannedDate?: PlannedDate;

  @ApiProperty({
    description: "Localização associada ao registro (opcional).",
    example: "São Paulo, Brasil",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "O campo 'Where' deve ser uma string." })
  Where?: string;

  @ApiProperty({
    description: "Idioma associado ao registro (opcional).",
    example: "Português",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "O campo 'Language' deve ser uma string." })
  Language?: string;

  @ApiProperty({
    description: "Conteúdo associado ao registro (opcional).",
    example: "Conteúdo da campanha.",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "O campo 'Content' deve ser uma string." })
  Content?: string;

  @ApiProperty({
    description: "Conteúdo da imagem associado ao registro (opcional).",
    example: "Texto associado à imagem",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "O campo 'ImageContent' deve ser uma string." })
  ImageContent?: string;

  @ApiProperty({
    description:
      "Imagens associadas ao registro (opcional). Cada imagem deve ter um tipo e URL válidos.",
    type: [ImageFile],
    required: false,
    example: [
      {
        type: "file",
        name: "imagem1.png",
        file: "http://example.com/imagem1.png",
      },
      {
        type: "external",
        name: "imagem2.png",
        external: "http://external.com/imagem2.png",
      },
    ],
  })
  @IsOptional()
  @ValidateNested({
    each: true,
    message: "Cada item em 'Image' deve ser um objeto válido.",
  })
  @Type(() => ImageFile)
  @IsArray({ message: "O campo 'Image' deve ser um array." })
  Image?: ImageFile[];
}
