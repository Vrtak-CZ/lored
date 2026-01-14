import { expect, test } from "bun:test";
import { parseTarget } from "./parser";

test("parseTarget", () => {
    expect(parseTarget("/http:example.com:8080/path")).toEqual(new URL("http://example.com:8080/path"));
    expect(parseTarget("/https:example.com:8080/path")).toEqual(new URL("https://example.com:8080/path"));
    expect(parseTarget("/example.com:8080/path")).toEqual(new URL("http://example.com:8080/path"));
    expect(parseTarget("/example.com/path")).toEqual(new URL("http://example.com/path"));
    expect(parseTarget("/example.com/path/subpath")).toEqual(new URL("http://example.com/path/subpath"));
    expect(parseTarget("/example.com/path?search=foo")).toEqual(new URL("http://example.com/path?search=foo"));
    expect(parseTarget("/example.com/path?search=foo&bar=bar")).toEqual(new URL("http://example.com/path?search=foo&bar=bar"));
    expect(parseTarget("/http:example.com:8080")).toEqual(new URL("http://example.com:8080/"));
    expect(parseTarget("/https:example.com:8080")).toEqual(new URL("https://example.com:8080/"));
    expect(parseTarget("/example.com:8080")).toEqual(new URL("http://example.com:8080/"));
    expect(parseTarget("/example.com")).toEqual(new URL("http://example.com/"));
    expect(parseTarget("/example.com/")).toEqual(new URL("http://example.com/"));
    expect(parseTarget("/example.com/path/")).toEqual(new URL("http://example.com/path/"));
    expect(parseTarget("/example.com/path?search=foo")).toEqual(new URL("http://example.com/path?search=foo"));
    expect(parseTarget("/example.com/path?search=foo&bar=bar")).toEqual(new URL("http://example.com/path?search=foo&bar=bar"));
    
});

test("parseTarget invalid", () => {
    expect(parseTarget("/")).toBeUndefined();
    expect(parseTarget("/http:")).toBeUndefined();
    expect(parseTarget("/https:")).toBeUndefined();
    expect(parseTarget("/example.com:")).toBeUndefined();
    expect(parseTarget("/example.com:foo")).toBeUndefined();
    expect(parseTarget("/foo:example.com/")).toBeUndefined();
    expect(parseTarget("/?search=foo")).toBeUndefined();
    expect(parseTarget("/#hash")).toBeUndefined();
    expect(parseTarget("/?search=foo&bar=bar")).toBeUndefined();
    expect(parseTarget("/?search=foo#hash")).toBeUndefined();
    expect(parseTarget("/?search=foo&bar=bar#hash")).toBeUndefined();
});