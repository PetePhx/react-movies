import { init } from "@sentry/browser";
import * as Sentry from "@sentry/browser";

init({
  dsn: "https://716f4f3236b54510aee4b98cb6dd9249@sentry.io/1340226"
});

function log(error) {
  console.log(error);
  Sentry.captureException(error);
}

export default { log };
