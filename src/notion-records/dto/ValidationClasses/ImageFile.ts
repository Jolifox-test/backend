import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class ImageFile {
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
