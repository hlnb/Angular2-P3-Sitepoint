//node imports
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//module
import { AppModule } from './app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);