export class Inject {

    private static readonly _globalInstance: Inject = new Inject();
    private static readonly _instance: Map<string, Inject> = new Map<string, Inject>();

    public static getInstance(namespace?: string): Inject {

        if (namespace) {
            if (!this._instance.has(namespace)) {
                this._instance.set(namespace, new Inject());
            }

            return this._instance.get(namespace) as Inject;
        }
        return this._globalInstance;
    }

    private readonly _services: Map<string, any>;
    private readonly _instances: Map<string, any>;

    private constructor() {
        this._services = new Map<string, any>();
        this._instances = new Map<string, any>();
    }

    public createServiceInjector<L extends Record<string, any>>(): (name: keyof L) => ClassDecorator {
        return (name: keyof L): ClassDecorator => {
            return (target: Function): void => {
                this.service(name as string, target);
                return;
            }
        }
    }

    public createServiceAutoWirer<L extends Record<string, any>>(): <T extends keyof L>(name: T) => L[T] {
        return <T extends keyof L>(name: T): L[T] => {
            return this.getService(name as string);
        };
    }

    public service(name: string, service: any) {
        this._services.set(name, service);
    }

    public getService(name: string) {

        if (this._services.has(name)) {
            if (!this._instances.has(name)) {
                const Construable: any = this._services.get(name) as any;
                this._instances.set(name, new Construable());
            }
            return this._instances.get(name);
        }

        throw new Error('NONE');
    }
}
