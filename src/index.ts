import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';

type Bindings = {
  CORS_ORIGIN: string
}

const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

app.use("*", csrf())

app.use("*", async (c, next) => {
  const corsMiddlewareHandler = cors({
    origin: c.env.CORS_ORIGIN,
  })
  return corsMiddlewareHandler(c, next)
})

app.get('/hola-mundo', (c) => {
  return c.json({ message: 'Hello Hono!' })
})

export default app
