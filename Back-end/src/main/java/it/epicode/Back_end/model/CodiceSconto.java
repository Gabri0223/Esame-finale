package it.epicode.Back_end.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
public class CodiceSconto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank
    private String nome;
    @NotNull(message = "La percentuale non può essere vuota")
    @Min(value = 1, message = "La percentuale deve essere almeno del 1%")
    @Max(value=100,message = "La percentuale non può superare il 100%")
    private int percentuale;
    private boolean attivo;
    private String codiceSconto;
}
