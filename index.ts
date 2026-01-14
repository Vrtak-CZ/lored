import { parseTarget } from "./parser";

const server = Bun.serve({
  port: process.env.PORT || 8080,
  routes: {
    "/": () => {
      return new Response("Coffee!", { status: 418 });
    },
  },
  fetch: (req) => {
    const url = new URL(req.url);
    const source = url.pathname + url.search;
    const target = parseTarget(source);
    
    if (!target) {
      return new Response("Not found!", { status: 404 });
    }

    console.log(`Redirecting to ${target.toString()}`);

    return new Response(`Redirecting to ${target.toString()}`, { status: 302, headers: { 'Location': target.toString() } });
  }
});

console.log(`Listening on ${server.url}`);

const shutdown = (signal: string) => {
  console.log(`Received ${signal}, shutting down...`);
  server.stop();
  process.exit(0);
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGQUIT", () => shutdown("SIGQUIT"));