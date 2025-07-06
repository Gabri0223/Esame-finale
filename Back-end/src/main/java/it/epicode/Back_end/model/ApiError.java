package it.epicode.Back_end.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ApiError {

    private String message;
    private LocalDate dataErrore;
}

