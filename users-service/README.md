# Users API Server

Simple API Server

## Get started ##

### Install all dependencies

```bash
npm install
```

### Start service

Make sure POSTGRES DB is up and running.
Create .env file in the root of the project using .env.example except #2 section

Run the following command:
```bash
npm run start
```

### Start service and POSTGRES DB in docker containers

CCreate .env file in the root of the project using .env.example except #1 section

Run the following command:
```bash
docker-componse up
```

### Lint your code

```bash
npm run eslint
```
