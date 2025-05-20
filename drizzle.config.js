import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'sqlite',
    schema: './server/src/db/schema.ts',
    dbCredentials: {
        url: 'file:db.sqlite',
    },
});
