import {
    Component,
    Directive,
    NgModule,
    Input,
    ViewContainerRef,
    Compiler,
    ComponentFactory,
    ModuleWithComponentFactories,
    ComponentRef,
    ReflectiveInjector
} from "@angular/core";

import { CommonModule } from "@angular/common";

export interface DynamicTemplateContext {
  [index: string]: any;
}
export class Utils {

    public static isPresent(obj) {
        return obj !== undefined && obj !== null;
    }
    public static isFunction(obj) {
        return typeof obj === "function";
    }
    public static applySourceAttributes(target: {}, source: {}) {
        if (!Utils.isPresent(source)) {
            return;
        }
        for (const property in source) {
            if (source.hasOwnProperty(property)) {
                const propValue = Reflect.get(source, property);
                const proxyObject: PropertyDescriptor = {};

                if (!Utils.isFunction(propValue)) {
                    proxyObject.set = (v) => Reflect.set(source, property, v);
                }
                proxyObject.get = () => Reflect.get(source, property);

                Reflect.defineProperty(target, property, proxyObject);
            }
        }
    }
}
export function createComponentFactory(compiler: Compiler, metadata: Component): Promise<ComponentFactory<any>> {
    const cmpClass = class DynamicComponent {};
    const decoratedCmp = Component(metadata)(cmpClass);

    @NgModule({ imports: [CommonModule], declarations: [decoratedCmp] })
    class DynamicHtmlModule { }

    return compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
        .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => {
            return moduleWithComponentFactory.componentFactories.find(x => x.componentType === decoratedCmp);
        });
}

@Directive({ selector: "html-outlet" })
export class HtmlOutlet {
    @Input() html: string;
    @Input() context: DynamicTemplateContext;
    cmpRef: ComponentRef<any>;

    constructor(private vcRef: ViewContainerRef, private compiler: Compiler) { }

    ngOnChanges() {
        const html = this.html;
        if (!html) return;

        if (this.cmpRef) {
            this.cmpRef.destroy();
        }

        const compMetadata = new Component({
            selector: "dynamic-html",
            template: this.html,
        });

        createComponentFactory(this.compiler, compMetadata)
            .then(factory => {
                const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
                this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);
                Utils.applySourceAttributes(this.cmpRef.instance, this.context);
            });
    }

    ngOnDestroy() {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    }
}
