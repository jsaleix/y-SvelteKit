# Y

The social network.

## Technologies

-   SvelteKit
-   PostgreSQL
-   Prisma
-   PandaCSS
-   Docker

## Try the project locally

**1 - Copy the environment file**

```
cp server/.env.example server/.env
```

**2 - Generate the prisma files**

```
cd server/ && npm i && npx prisma generate
```

**3 - Build and start**

```
docker compose up -d --build
```

Go to http://localhost:8080/i/login

## ⚠️ Dev mode unknown bug

Currently, the current Dockerfile executed in the compose.yml file starts the app/svelte in preview mode `npm run preview`. However, during developement, we would use `npm run dev` instead to reload the application each time a change is made.

However, in this mode, make sure you don't use `/` as the first url you try, as this locks the application in a loading state, rendering the whole application unusable.

This doesn't mean that the `/` route is inaccessible, quite the contrary, but when the application has just started, make sure that it's not the first route you try to reach. If it is, it's no big deal, you'll just have to restart the application and reach another url like `/i/login`.
