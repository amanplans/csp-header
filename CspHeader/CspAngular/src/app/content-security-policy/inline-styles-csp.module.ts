import { NgModule } from '@angular/core';
import { ɵDomSharedStylesHost } from '@angular/platform-browser';

import { CustomDomSharedStylesHost } from './shared-styles-host';

@NgModule({
  providers: [
    { provide: ɵDomSharedStylesHost, useClass: CustomDomSharedStylesHost },
  ],
})
export class InlineStylesCSPModule {}
