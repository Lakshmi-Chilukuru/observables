import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from "@sentry/angular";
import { AppModule } from './app/app.module';

Sentry.init({
  dsn: "https://fab55bd085b446b1eaad8d6e5ed0e7c2@o4510749198909440.ingest.us.sentry.io/4510749200351232",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
