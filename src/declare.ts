/**
 * @author WMXPY
 * @namespace DI
 * @description Declare
 */

export type Injector<L extends Record<string, any>> = (name: keyof L) => ClassDecorator;
export type AutoWirer<L extends Record<string, any>> = <T extends keyof L>(name: T) => L[T];
