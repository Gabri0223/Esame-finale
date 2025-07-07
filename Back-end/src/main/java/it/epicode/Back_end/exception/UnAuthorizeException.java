package it.epicode.Back_end.exception;

public class UnAuthorizeException extends RuntimeException {
    public UnAuthorizeException(String message) {
        super(message);
    }
}
