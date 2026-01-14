export function parseTarget(source: string): URL | undefined {
    const regex = /^\/(https?:)?([a-zA-Z0-9.-]+)(?::(\d+))?(\/[^#]*)?$/;
    const match = source.match(regex);
    if (!match) {
        return;
    }

    const [, protocol, domain, port, path] = match;
    return new URL(`${protocol ?? 'http:'}//${domain}${port ? ':' + port : ''}${path ?? ''}`);
}