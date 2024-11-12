# Projeto API de Registros no Notion

Este projeto é uma API desenvolvida com o **NestJS**, que permite criar, atualizar e gerenciar registros relacionados a campanhas e dados associados a empresas. A API suporta operações como criação e atualização de registros de campanhas, incluindo dados como descrição, data planejada, imagens e muito mais.

## Tecnologias Utilizadas

- **NestJS**: Framework NodeJs para construção da API
- **TypeScript**: Linguagem de programação utilizada
- **Class-Validator**: Para validação dos dados recebidos
- **Class-Transformer**: Para transformação dos dados de entrada
- **Swagger**: Para gerar a documentação da API

## Use a API

Essa aplicação possui um deploy disponível através do link https://backend-0k01.onrender.com esse deploy fica offline e assim que requisitado, online, demora cerca de um minuto para entrar no ar.

## Instalação

### 1. Clonando o repositório

Clone o repositório para sua máquina local utilizando o comando abaixo:

```bash
git clone https://github.com/Jolifox-test/backend.git
```

### 2. Instalando as dependências

Entre na pasta do projeto e instale as dependências:

```bash
cd backend
npm i
```

### 3. Configuração o Banco de Dados

Para usar a API, você precisará de um banco de dados configurado, o id desse banco e uma key da API do Notion.

Crie um arquivo .env cópia do .env.example e configure as variaveis de ambiente.

### 4. Executando a aplicação

Para rodar a aplicação em modo de desenvolvimento, utilize o seguinte comando:

```bash
npm run start:dev
```

A aplicação estará disponível em http://localhost:3000. Caso deseje uma outra porta, use a variável PORT no .env.

## Endpoints

A API gera automaticamente uma documentação interativa através do Swagger. Para acessar a documentação, basta iniciar o servidor da API e navegar até http://localhost:3000/api-docs.

## Estrutura do Projeto

A estrutura do projeto é a seguinte:

```bash
src/
│
├── notion-records/
│ ├── dto/
│ ├── notion-record.controller.ts
│ ├── notion-record.service.ts
│ └── notion-record.module.ts
├── utils/

│ └── utils.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
│
└── .env
```

## Licença

Este projeto é licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes.
