class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

class ValidationError extends AppError {
    constructor(message) {
        super(message, 400)
    }
}

class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404)
    }
}

class UnauthorizedError extends AppError {
    constructor(message) {
        super(message, 401);
    }
}

class ForbiddenError extends AppError {
    constructor(message) {
        super(message, 403);
    }
}

class ConflictError extends AppError {
    constructor(message) {
        super(message, 409);
    }
}

class BadRequestError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}

module.exports = {
    AppError,
    BadRequestError,
    ConflictError,
    ForbiddenError,
    NotFoundError,
    UnauthorizedError,
    ValidationError
}