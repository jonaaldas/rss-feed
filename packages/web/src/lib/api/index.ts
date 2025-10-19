import { hc } from "hono/client";
import type { AppType } from "../../../../server/src/index";

export const client = hc<AppType>("/api", {
  init: {
    credentials: "include", // Required for sending cookies cross-origin
  },
});
