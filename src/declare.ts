/**
 * @author WMXPY
 * @namespace DI
 * @description Declare
 */

export type Injector = () => ClassDecorator;
export type AutoWirer = <T = any>(clazz: any) => T;
