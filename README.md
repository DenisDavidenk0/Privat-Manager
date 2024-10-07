# Getting Started with project
## Project created based on
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [React Admin](https://marmelab.com/react-admin/)

## How to run the local development environment 

### Server env


#### Fill in the .env file with the following content and create a database with the name `privat_bank` in your PostgreSQL
```bash
DB_HOST=localhost
DB_NAME=privat_bank
DB_USER=postgres
DB_PASSWORD=1111
DB_PORT=5432
```

### Client env
```bash
VITE_APP_ENVIRONMENT="development"
VITE_API_URL=http://localhost:3000/api 
```

### Client
```bash
cd client
npm install
npm run dev
```

### Server
```
cd server
npm install
npm run dev
```

### Database
This project uses PostgreSQL as the database. You can run it locally.


## How to run Docker Compose

### It is mandatory to create an env file in the root category. 
```bash
VITE_APP_ENVIRONMENT="production"
VITE_API_URL=http://localhost/api

DB_HOST=db
DB_NAME=privat_bank
DB_USER=postgres
DB_PASSWORD=1111
DB_PORT=5432
```
### After that run this commands

```bash
docker-compose build

docker-compose up
```


