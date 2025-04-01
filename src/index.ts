import { Hono } from "hono";
export { RoomDO } from "./durable-object";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/room/:id", async (c) => {
  console.log("asf");
  const id = c.req.param("id");
  const doId = c.env.ROOM.idFromName(id);
  const stub = c.env.ROOM.get(doId);
  const response = await stub.sayHello();
  return response as unknown as Response;
});

// Add WebSocket connection endpoint
app.get("/room/:id/connect", async (c) => {
  console.log("here 1")
  const id = c.req.param("id");
  const doId = c.env.ROOM.idFromName(id);
  const stub = c.env.ROOM.get(doId);
  
  return stub.fetch(c.req.raw);
});

// Add webhook endpoint for receiving messages
app.post("/webhook/room/:id", async (c) => {
  const id = c.req.param("id");
  const doId = c.env.ROOM.idFromName(id);
  const stub = c.env.ROOM.get(doId);
  
  // Forward the webhook payload to the Durable Object
  return stub.fetch(c.req.raw);
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
