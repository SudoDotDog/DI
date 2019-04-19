/**
 * @author WMXPY
 * @namespace DI
 * @description Inject
 */

import { _Random } from "@sudoo/bark/random";
import { AutoWirer, Injector } from "./declare";
import { ERROR_CODE, panic } from "./panic";

export class Inject {

    public static getInstance(namespace?: string): Inject {

        if (namespace) {

            if (!this._instance.has(namespace)) {
                this._instance.set(namespace, new Inject());
            }
            return this._instance.get(namespace) as Inject;
        }
        return this._globalInstance;
    }

    public static removeAllInstance(): void {

        this._globalInstance.remove();
        this._instance.clear();
    }

    public static removeGlobalInstance(): void {

        this._globalInstance.remove();
    }

    private static readonly _globalInstance: Inject = new Inject();
    private static readonly _instance: Map<string, Inject> = new Map<string, Inject>();

    private readonly _services: Map<any, string>;
    private readonly _instances: Map<string, any>;

    private constructor() {

        this._services = new Map<any, string>();
        this._instances = new Map<string, any>();
    }

    public get length(): number {
        return this._services.size;
    }
    public get instancesLength(): number {
        return this._instances.size;
    }

    public remove(): this {

        this._services.clear();
        this._instances.clear();
        return this;
    }

    public createServiceInjector(): Injector {

        return (): ClassDecorator => {
            return (target: any): void => {
                this.service(target);
                return;
            };
        };
    }

    public createServiceAutoWirer(): AutoWirer {

        return <T>(clazz: any): T => {
            return this.getService(clazz as string);
        };
    }

    public service(service: any): this {

        const unique: string = _Random.unique();
        this._services.set(unique, service);
        return this;
    }

    public getService(clazz: any): any {

        this._ensureService(clazz);
        const hash: string = this._services.get(clazz) as string;

        if (!this._instances.has(clazz)) {
            this._instances.set(hash, new clazz());
        }
        return this._instances.get(hash);
    }

    public refreshService(clazz: any, ...args: any[]): any {

        this._ensureService(clazz);
        const hash: string = this._services.get(clazz) as string;

        const constructed: any = new clazz(...args);
        this._instances.set(hash, constructed);
        return constructed;
    }

    private _ensureService(clazz: any): void {

        if (!this._services.has(clazz)) {
            throw panic.code(ERROR_CODE.SERVICE_NOT_FOUND, clazz.toString());
        }
    }
}
