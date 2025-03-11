# School Management Dashboard

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Lama Dev Youtube](https://youtube.com/lamadev) 
- [Next.js](https://nextjs.org/learn)

## Prisms
- Install Prisma [npm install prisma typescript tsx @types/node --save-dev]
- Set up your Prisma ORM project by creating your Prisma Schema [npx prisma init]
- Set the databse source url in the .env file eg: 
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb"
- Run a migration to create your database tables [npx prisma migrate dev --name init]
    This command did three things:
        1. It created a new SQL migration file for this migration in the prisma/migrations directory
        2. It executes the SQL migration file against the database
        3. It ran prisma generate under the hood (which installed the @prisma/client package and generated a tailored Prisma Client API based on your models)

- Run prisma studio to see the schemas [npx prisma studio]

- Reseting the database
    npx prisma db push --force-reset

- Seeding data or setting initial data
   npx prisma db seed