# Gods of the arena Backend
This project is the backend of the technical for Pupl.

## Development mode installation

You must have node.js and PostgreSQL installed.

### Database configuration
Create a postgreSql database called for example 'gods_of_the_arena'.

Then use the `script-bdd.sql` file to create the different tables and insert the default data.
The file is located in `server/config`.

### Environment variables

Create a `.env` file at the root of the project.

Copy / paste the following code inside, replacing the `...` with your environment variables.

```{r}
DB_NAME = ...
DB_HOST = ...
DB_USER = ...
DB_PASSWORD = ...
DB_PORT = ...

PORT = ...
```

## Development mode
Run `npm run dev`. The application will be automatically restarting when file changes in the directory are detected.
