declare function success(msg: string, details?: string | string[] | null): void;
declare function error(msg: string, details?: string | string[] | null): void;
declare function info(msg: string, details?: string | string[] | null): void;
declare function warn(msg: string, details?: string | string[] | null): void;
declare const _default: {
    success: typeof success;
    error: typeof error;
    info: typeof info;
    warn: typeof warn;
};
export default _default;
//# sourceMappingURL=logger.d.ts.map