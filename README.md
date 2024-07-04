# Project Management

## Run Locally

Go to the server directory

```bash
cd server
```

Copy .env.example to .env (You may create new database and set database url into .env file or you can use my database url from atlas and let DATABASE_URL from .env empty)

```bash
cp .env.example .env
```

Back to root directory

```bash
cd ..
```

Run docker compose

```bash
docker compose up -d --build
```
