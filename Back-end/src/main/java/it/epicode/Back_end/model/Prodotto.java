package it.epicode.Back_end.model;

import it.epicode.Back_end.enumerated.TipoAnimale;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
@MappedSuperclass
public abstract class Prodotto {

    @NotBlank
    private String nome;
    @NotBlank
    private String marca;
    @Positive
    private double prezzo;
    @NotBlank
    private String descrizione;
    @Enumerated(EnumType.STRING)
    private TipoAnimale tipoAnimale;

}
