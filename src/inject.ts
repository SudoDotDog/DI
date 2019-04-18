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

    public createServiceInjector() {
        
    }

    public service(name: string, service: any) {
        this._services.set(name, service);
    }

    public getService(name: string){
        
        if(this._services.has(name)){
            if(!this._instances.has(name)){
                const Construable = this._services.get(name);
                this._instances.set(name, new Construable());
            }
            return this._instances.get(name);
        }

        throw new Error('NONE');
    }
}

export const Service = (name: string, namespace?: string) => {
    
    return (target: any) => {
        
        const instance: Inject = Inject.getInstance(namespace);
        instance.service(name, target);
        return target;
    }
};
