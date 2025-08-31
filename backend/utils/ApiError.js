/**
 * Custom API Error Class
 * Extends the built-in Error class to provide standardized error handling
 */
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
        this.timestamp = new Date().toISOString();

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    // Static methods for common error types
    static badRequest(message = "Bad Request", errors = []) {
        return new ApiError(400, message, errors);
    }

    static unauthorized(message = "Unauthorized", errors = []) {
        return new ApiError(401, message, errors);
    }

    static forbidden(message = "Forbidden", errors = []) {
        return new ApiError(403, message, errors);
    }

    static notFound(message = "Not Found", errors = []) {
        return new ApiError(404, message, errors);
    }

    static methodNotAllowed(message = "Method Not Allowed", errors = []) {
        return new ApiError(405, message, errors);
    }

    static conflict(message = "Conflict", errors = []) {
        return new ApiError(409, message, errors);
    }

    static unprocessableEntity(message = "Unprocessable Entity", errors = []) {
        return new ApiError(422, message, errors);
    }

    static tooManyRequests(message = "Too Many Requests", errors = []) {
        return new ApiError(429, message, errors);
    }

    static internalServer(message = "Internal Server Error", errors = []) {
        return new ApiError(500, message, errors);
    }

    static notImplemented(message = "Not Implemented", errors = []) {
        return new ApiError(501, message, errors);
    }

    static badGateway(message = "Bad Gateway", errors = []) {
        return new ApiError(502, message, errors);
    }

    static serviceUnavailable(message = "Service Unavailable", errors = []) {
        return new ApiError(503, message, errors);
    }

    static gatewayTimeout(message = "Gateway Timeout", errors = []) {
        return new ApiError(504, message, errors);
    }

    // Method to convert error to JSON response format
    toJSON() {
        return {
            success: this.success,
            statusCode: this.statusCode,
            message: this.message,
            errors: this.errors,
            timestamp: this.timestamp,
            ...(process.env.NODE_ENV === 'development' && {
                stack: this.stack
            })
        };
    }

    // Method to log error details
    log() {
        const errorDetails = {
            statusCode: this.statusCode,
            message: this.message,
            errors: this.errors,
            stack: this.stack,
            timestamp: this.timestamp
        };

        if (this.statusCode >= 500) {
            console.error('🚨 SERVER ERROR:', errorDetails);
        } else if (this.statusCode >= 400) {
            console.warn('⚠️ CLIENT ERROR:', errorDetails);
        } else {
            console.info('ℹ️ INFO:', errorDetails);
        }
    }
}

export { ApiError };
