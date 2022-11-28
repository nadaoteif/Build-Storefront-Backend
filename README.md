# Udacity: Build A Storefront Backend

This is a backend API build in Nodejs for an online store. It exposes a RESTful API that will be used by the frontend developer on the frontend. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

### Prerequisites

You need the following modules and dependencies installed to run this project:

```bash
docker-compose   # To run the Postgres database on Docker
node 12          # To run the application
yarn             # For dependency management
```

## Enviromental Variables Set up

First, create a `.env` file with all the required environment variables:

```bash
# .env
PORT=3000
MY_ENV=dev

# set database connection info 
MY_HOST=localhost
DB_PORT=5432
MY_USER=postgres
MY_PASSWORD=DaN312Kh$
MY_DB=shopping_dev
MY_TEST_DB=shopping_test

# security
PEPPER=this-is-nada-oteif-2022
SALT_ROUNDS=10
TOKEN_SECRET=nada-oteif-2022-secret-token
```
Next, start the Postgres server on Docker:

```bash
docker-compose up
```

## Set up Database
### Create Databases

```bash
# Login to Postgres
psql -U postgres

# create databases 
create database shopping_dev; 
create database shopping_test; 

```
### Migrate Database
Navigate to the root directory and run the command below to migrate the database 

`npm run migrate_up`


## Installation Instructions
This section contains all the packages used in this project and how to install them. However, you can fork this repo and run the following command at the root directory to install all packages.

`npm install`

### Packages

Here are some of the few packages that were installed.

#### express
`npm i express`
`npm i --save-dev @types/express`

#### typescript
`npm i --save-dev typescript`

#### db-migrate
`npm install db-migrate`

#### cors
`npm i cors`
`npm i --save-dev @types/cors`

#### bcrypt
`npm i bcrypt`
`npm i --save-dev @types/bcrypt`

#### jsonwebtoken
`npm i jsonwebtoken`
`npm i --save-dev @types/jsonwebtoken`

#### dotenv
`npm i dotenv`

#### jasmine
`npm i --save-dev jasmine`
`npm i --save-dev @types/jasmine`
#### supertest
`npm i supertest`
`npm i --save-dev @types/supertest`

## Running the application
`npm run watch`

### Running Ports 
After start up, the server will start on port `3000` and the database on port `5432`

Use the following command to run the application in watch mode:

```bash
npm run watch
```

Use the following command to run the application in using node:

```bash
npm run start
```

## Token and Authentication
Tokens are passed along with the http header as 
```
Authorization   Bearer <token>
```

## Testing
Run test with 

`npm run test`

It sets the environment to `test`, migrates up tables for the test database, run the test then migrate down all the tables for the test database. 

## Endpoint Access
All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file. 