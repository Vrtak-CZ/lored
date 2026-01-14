import packageJson from "./package.json";

const image = `vrtakcz/lored:${packageJson.version}`;

await Bun.$`docker buildx build --platform linux/amd64,linux/arm64 --tag ${image} --push .`;
