/**
 * @author WMXPY
 * @namespace DI
 * @description Inject
 */

export class Inject<L extends Record<string, any>> {

    public static getInstance<L extends Record<string, any>>(namespace?: string): Inject<L> {

        if (namespace) {

            if (!this._instance.has(namespace)) {
                this._instance.set(namespace, new Inject<L>());
            }
            return this._instance.get(namespace) as Inject<L>;
        }
        return this._globalInstance;
    }

    private static readonly _globalInstance: Inject<any> = new Inject();
    private static readonly _instance: Map<string, Inject<any>> = new Map<string, Inject<any>>();

    private readonly _services: Map<keyof L, any>;
    private readonly _instances: Map<keyof L, any>;

    private constructor() {

        this._services = new Map<keyof L, any>();
        this._instances = new Map<keyof L, any>();
    }

    public createServiceInjector(): (name: keyof L) => ClassDecorator {

        return (name: keyof L): ClassDecorator => {
            return (target: any): void => {
                this.service(name as string, target);
                return;
            };
        };
    }

    public createServiceAutoWirer(): <T extends keyof L>(name: T) => L[T] {

        return <T extends keyof L>(name: T): L[T] => {
            return this.getService(name as string);
        };
    }

    public service<T extends keyof L>(name: T, service: L[T]): this {

        this._services.set(name, service);
        return this;
    }

    public getService<T extends keyof L>(name: T): any {

        this._ensureService(name);
        if (!this._instances.has(name)) {
            const Construable: any = this._services.get(name) as any;
            this._instances.set(name, new Construable());
        }
        return this._instances.get(name);
    }

    public refreshService<T extends keyof L>(name: T, ...args: any[]): any {

        this._ensureService(name);
        const Construable: L[T] = this._services.get(name) as any;
        const constructed: any = new Construable(...args);
        this._instances.set(name, constructed);
        return constructed;
    }

    private _ensureService(name: keyof L): void {

        if (!this._services.has(name)) {
            throw new Error('NONE');
        }
    }
}
