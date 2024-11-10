# Sistema PetAdota

Este repositório foi feito para um sistema voltado para uma ONG de animais que possibilita o cadastro de animais para adoção, assim como a edição dos dados e remoção desses animais. O sistema permite a visualização dos animais disponíveis para adoção e do seu status de adoção.

## Linguagens e Ferramentas Utilizadas

- **Java**: Para o desenvolvimento do backend com Spring Boot.
- **React**: Para o desenvolvimento do frontend.
- **Vite**: Ferramenta de build para desenvolvimento frontend.
- **H2**: Banco de dados utilizado para persistência de dados.

## Como Utilizar

### Backend

1. Acesse a pasta do backend:
    ```bash
    cd backend
    ```

2. Inicie o backend na pasta `SistematizacaoApplication`:
    ```bash
    ./mvnw spring-boot:run
    ```

### Frontend

1. Acesse a pasta do frontend:
    ```bash
    cd frontend
    ```

2. Instale as dependências com o npm:
    ```bash
    npm install
    ```

3. Inicie o frontend:
    ```bash
    npm run dev
    ```

4. Acesse a URL local do frontend para visualizar a interface da aplicação.

## Documentação da API

A documentação completa dos endpoints da API pode ser acessada pelo Swagger. Certifique-se de que o backend está em execução e acesse:

- [Swagger UI - Documentação da API](http://localhost:8080/swagger-ui/index.html#/)

## Endpoints do Controller

Abaixo estão listados os principais endpoints do `AnimalController`:

- **Buscar animal por ID**  
  `GET /api/animal/{id}`  
  Retorna as informações de um animal com base no ID fornecido.

- **Cadastrar novo animal com imagem**  
  `POST /api/animal/create`  
  Permite o cadastro de um animal, incluindo o upload de uma imagem. Requer os parâmetros: `nome`, `tipo`, `idade`, `raca`, `descricao` e `file` (imagem).

- **Listar todos os animais**  
  `GET /api/animal/list`  
  Retorna a lista de todos os animais cadastrados.

- **Listar animais por tipo**  
  `GET /api/animal/list-tipo`  
  Retorna a lista de animais filtrados por tipo. Requer o parâmetro `tipo`.

- **Obter imagem de um animal**  
  `GET /api/animal/image/{id}`  
  Retorna a imagem do animal com base no ID fornecido.

- **Atualizar informações de um animal**  
  `PUT /api/animal/{id}`  
  Atualiza os dados de um animal com base no ID fornecido. Requer o corpo da requisição com os dados atualizados.

- **Remover animal**  
  `DELETE /api/animal/{id}`  
  Remove o animal com base no ID fornecido.

## Autor

Renata Souza

## Data

Novembro de 2024
