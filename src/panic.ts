/**
 * @author WMXPY
 * @namespace DI
 * @description Panic
 */

import { Panic } from "connor";

export const MODULE_NAME = 'Sudoo-DI';

export enum ERROR_CODE {

    SERVICE_NOT_FOUND = 1025,
}

export const ERROR_LIST: Record<ERROR_CODE, string> = {

    [ERROR_CODE.SERVICE_NOT_FOUND]: 'Service: "{}" not found',
};

export const panic: Panic<ERROR_CODE> = Panic.withDictionary(MODULE_NAME, ERROR_LIST);
