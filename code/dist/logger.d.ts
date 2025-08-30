type logOptions = {
    level?: 'success' | 'error' | 'info' | 'warn' | 'text';
    prefix?: string | undefined | null;
    msg: string;
    details?: string | string[] | undefined | null;
};
declare function success({ prefix, msg, details }: logOptions): void;
declare function error({ prefix, msg, details }: logOptions): void;
declare function info({ prefix, msg, details }: logOptions): void;
declare function warn({ prefix, msg, details }: logOptions): void;
declare const _default: {
    success: typeof success;
    error: typeof error;
    info: typeof info;
    warn: typeof warn;
};
export default _default;
//# sourceMappingURL=logger.d.ts.map