import { IsDateString, IsOptional } from "class-validator";

export default class PlannedDate {
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
