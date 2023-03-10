import { NgModule } from '@angular/core';
import { ÉµDomSharedStylesHost } from '@angular/platform-browser';

import { CustomDomSharedStylesHost } from './shared-styles-host';

@NgModule({
  providers: [
    { provide: ÉµDomSharedStylesHost, useClass: CustomDomSharedStylesHost },
  ],
})
export class InlineStylesCSPModule {}
