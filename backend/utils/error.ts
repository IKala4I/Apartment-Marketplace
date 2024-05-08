export interface ErrorResponse {
    error: string;
    status: string;
    http_code: number;
}

export function badRequest(error: string, status: string): ErrorResponse {
    return {
        error,
        status,
        http_code: 400
    };
}

export function notFoundRequest(error: string, status: string): ErrorResponse {
    return {
        error,
        status,
        http_code: 404
    };
}