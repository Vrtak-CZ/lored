import { parseTarget } from "./parser";

const server = Bun.serve({
  port: process.env.PORT || 3000,
  routes: {
    "/": () => {
      return new Response("Coffee!", { status: 418 });
    },
  },
  fetch: (req) => {
    const url = new URL(req.url);
    console.dir({ url });
    const source = url.pathname + url.search;
    const target = parseTarget(source);
    
    if (!target) {
      return new Response("Not found!", { status: 404 });
    }

    return new Response(`Redirecting to ${target.toString()}`, { status: 302, headers: { 'Location': target.toString() } });
  }
});

console.log(`Listening on ${server.url}`);