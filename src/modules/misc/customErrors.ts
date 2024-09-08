import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';

class NetworkException extends Error {
	statusCode: number;
	constructor(statusCode: number, message?: string, options?: ErrorOptions) {
		super(message, options);
		this.statusCode = statusCode;
	}
}

class BadRequestException extends NetworkException {
	constructor(message?: string, options?: ErrorOptions) {
		super(StatusCodes.BAD_REQUEST, message, options);
		this.name = ReasonPhrases.BAD_REQUEST;
	}
}

class UnauthorizedException extends NetworkException {
	constructor(message?: string, options?: ErrorOptions) {
		super(StatusCodes.UNAUTHORIZED, message, options);
		this.name = ReasonPhrases.UNAUTHORIZED;
	}
}

class ForbiddenException extends NetworkException {
	constructor(message?: string, options?: ErrorOptions) {
		super(StatusCodes.FORBIDDEN, message, options);
		this.name = ReasonPhrases.FORBIDDEN;
	}
}

class NotFoundException extends NetworkException {
	constructor(message?: string, options?: ErrorOptions) {
		super(StatusCodes.NOT_FOUND, message, options);
		this.name = ReasonPhrases.NOT_FOUND;
	}
}

class ConflictException extends NetworkException {
	constructor(message?: string, options?: ErrorOptions) {
		super(StatusCodes.CONFLICT, message, options);
		this.name = ReasonPhrases.CONFLICT;
	}
}

class InternalServerException extends NetworkException {
	constructor(message?: string, options?: ErrorOptions) {
		super(StatusCodes.INTERNAL_SERVER_ERROR, message, options);
		this.name = ReasonPhrases.INTERNAL_SERVER_ERROR;
	}
}

export {
	BadRequestException,
	ConflictException,
	ForbiddenException,
	InternalServerException,
	NetworkException,
	NotFoundException,
	UnauthorizedException,
};
