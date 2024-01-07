# My Wallet - API REST

Aplicação back-end para gerenciamento de uma carteria digital através de requisições HTTP(s) seguindo a convenção REST.

## Como funciona?
Este é um projeto é uma API REST para atender uma carteira financeira. Ele possui a entidade:
- User
- Transaction

<details>
  <summary><h3>Endpoints</h3></summary>

  ### POST /sign-up
  #### Entrada
  ```json
  {
    "name": "Gustavo",
    "email": "gustavo@email.com",
    "password": "gustavo123"
  }
  ```
  #### Saída
  ```
  status 201
  ```

  ### POST /sign-in
  ```json
  {
    "email": "gustavo@email.com",
    "password": "gustavo123"
  }
  ```

  #### Saída
  ```
  status 200
  ```
  ```json
  {
    "token": UUID,
    "id": ID do usuário
  }
  ```
  ## Rotas Autenticadas
  
  ### POST /transaction/:type
  
  #### Entrada
  ```json
  {
    "type": "saida" (ou entrada),
    "value": 90.00,
    "description": "bolsa"
  }
  ```
  #### Saída
  ```
    status 200
  ```

  ### GET /transactions

  #### Saída
  ```json
  [
    {
        "id": "afa02595-d216-45d7-af5c-ac09cf977d84",
        "description": "bolsa",
        "id_user": "afa02535-e416-45d7-af5c-ac19cf977d84",
        "value": 90
        "type": "entrada" (ou saida)
      }, ...
  ]
  ```
</details>

## Como rodar o projeto

1. Clone este repositório.
2. Instale as dependências usando `npm install`.
3. Crie um banco de dados MongoDB para o My Wallet.
4. Crie o arquivo `.env` e crie a variável `DATABASE_URL` com o link para o banco.
7. Acesse a API em [http://localhost:5000/](http://localhost:5000/).

## Tecnologias Utilizadas

- Node
- Express
- MongoDB
