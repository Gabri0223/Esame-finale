package it.epicode.Back_end.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginDto {
    @NotNull(message = "l'username non può essere vuoto")
    private String username;
    @NotNull(message="la password non può essere vuota")
    private String password;
}
