if (typeof ReadableStream === "undefined") {
  globalThis.ReadableStream = require("web-streams-polyfill/ponyfill").ReadableStream;
}
