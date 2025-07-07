package it.epicode.Back_end.exception;

import it.epicode.Back_end.model.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDate;

@RestControllerAdvice
public class CustomizedExceptionHandler {

    @ExceptionHandler(ValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError validationExceptionHandler(ValidationException e){
        ApiError error = new ApiError();
        error.setDataErrore(LocalDate.now());
        error.setMessage(e.getMessage());
        return error;
    }
    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiError notFoundExceptionHandler(NotFoundException e){
        ApiError error = new ApiError();
        error.setDataErrore(LocalDate.now());
        error.setMessage(e.getMessage());
        return error;
    }
    @ExceptionHandler(UnAuthorizeException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiError UnAuthorizedException(UnAuthorizeException e){
        ApiError error= new ApiError();
        error.setDataErrore(LocalDate.now());
        error.setMessage(e.getMessage());
        return error;
    }

}
