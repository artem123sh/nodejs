# Users API Server

Simple API Server

## Get started ##

### Install all dependencies

```bash
npm install
```

### Start service

Make sure POSTGRES DB is up and running.
Create .env file in the root of the project.
Add DATABASE_URL environment variable to the file, e.g.
```bash
// .env file content
DATABASE_URL=postgres://user:pass1@localhost:5432/users
PORT=3000
```
PORT is optional and equals 3000 by default.

Run the following command:
```bash
npm run start
```

### Start service and POSTGRES DB in docker containers

Create .env file in the root of the project.
Add DB_USER, DB_PASSWORD, PORT variables to the file, e.g.
```bash
// .env file content
DB_USER=user
DB_PASSWORD=pass1
PORT=3000
```

Run the following command:
```bash
docker-componse up
```

### Lint your code

```bash
npm run eslint
```
