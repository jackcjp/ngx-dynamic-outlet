import { NgModule, Compiler, ModuleWithProviders, COMPILER_OPTIONS, CompilerFactory, forwardRef } from "@angular/core";
import { JitCompilerFactory } from "@angular/platform-browser-dynamic";
import { CommonModule } from '@angular/common';
import { HtmlOutlet } from './html-outlet';

export * from './html-outlet';

export function createCompiler(compilerFactory: CompilerFactory) {
    return compilerFactory.createCompiler();
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HtmlOutlet
  ],
  exports: [
    HtmlOutlet
  ], 
  providers: [
       { provide: COMPILER_OPTIONS, useValue: { }, multi: true },
      { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] },
      { provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory] }
  ]
})
export class NgxDynamicOutletModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxDynamicOutletModule,
    };
  }
}
