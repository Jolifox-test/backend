import { InternalServerErrorException } from "@nestjs/common";

function treatUnexpectedError(error: any) {
  console.error(error);
  if (error.response) {
    throw new InternalServerErrorException(
      `Erro na Notion API : ${error.response.status} ${error.response.statusText} - ${JSON.stringify(error.response.data)}`,
    );
  } else {
    throw new InternalServerErrorException(
      `Oops, um erro inesperado aconteceu: ${error.message}`,
    );
  }
}

export default { treatUnexpectedError };
