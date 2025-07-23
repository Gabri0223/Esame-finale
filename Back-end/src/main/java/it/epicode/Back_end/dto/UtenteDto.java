package it.epicode.Back_end.dto;

import lombok.Data;

@Data
public class UtenteDto{
    private String nome;
    private String cognome;
    private String username;
    private String password;
    private String email;
}
