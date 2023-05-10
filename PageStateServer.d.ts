export declare function currentPageState<T>(initialPageState: T, path: string, clearAuto?: boolean): T;
export declare function getPageLocation(path: string): string;
export declare function getPageState<T>(initialPageState: T, path: string, clearAuto?: boolean): T;
export declare function parseQueryStringByPageState<T>(pageState: T): string;
export declare function experimental_setPageState<T>(nextPageState: T, path: string, revalidate?: () => void): void;
