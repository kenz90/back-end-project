# Northcoders House of Games API

### Instructions

1. Clone the repository

```
git clone https://github.com/kenz90/back-end-project.git
```

and `cd` into the directory 2. Run `npm install` to install dependencies 3. To successfully connect to the databases, the developer should specify the databases in two .env files. From the root of the project directory, run the following:

```
echo 'PGDATABASE=nc_games' > ./.env.development
echo 'PGDATABASE=nc_games_test' > ./.env.test
```

4. Run `npm run setup-dbs` & `npm run seed` to setup and seed the development and test databases
