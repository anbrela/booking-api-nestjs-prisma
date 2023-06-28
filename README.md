
## Description

This is a simple Api to manage booking appointments.

This project is done with: 
- [Nest](https://github.com/nestjs/nest)
- Prisma ORM
- Postgres
- Docker


## Todo
- ~~Add roles in some endpoints~~
- ~~Create availability module~~
- ~~Create bulk availability~~
- Create appointments module
- ~~Add swagger~~
- Add some tests

## Mounting the project

```bash
# Clone the repo
$ docker-compose up -d

```


## Installation

```bash
$ npm install
```


## Prisma setup

```bash

    # Install prisma globally
    $ npm install -g prisma
    $ npx prisma migrate dev
    $ npx prisma generate

```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Pablo Naveira](https://github.com/anbrela)


