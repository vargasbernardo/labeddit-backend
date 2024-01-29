# Labeddit Backend
  Este é um projeto de Backend que faz parte de um projeto full-stack desenvolvido para o curso da Labenu. A API possui recursos para Usuários, Posts e Comentários. É capaz de realizar login e signup de usuários, além do CRUD para posts e comentários, com o intuito de receber informações, criar, editar e deletar posts e comentários. Mais além, há endpoints para likes e dislikes de comentários e posts. O projeto foi desenvolvido utilizando Arquitetura em camadas e Programação orientada a objetos, Além de testes para garantir o funcionamento dos endpoints.

**Tecnologias Utilizadas**
- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- Geração de UUID
- Geração de Hashes
- Autenticação e Autorização
- Roteamento
- Jest

**Instalação**
´´´npm install´´´

´´´npm run knex: migrate´´´

´´´npm run knex: seed´´´

**Uso**
´´´npm run dev´´´

**Endpoints**
*Usuários*
- POST/signup
- POST/login
- GET/users
*Posts*
- POST/posts
- GET/posts
- DELETE/posts/:id
- PUT/posts/:id
*Comentários*
- POST/comments
- GET/comments
- DELETE/comments/:id
- PUT/comments/:id
*Like/Dislike*
- PUT/posts/:id/like
- PUT/comments/:id/like  
