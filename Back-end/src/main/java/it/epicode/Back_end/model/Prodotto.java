package it.epicode.Back_end.model;

import it.epicode.Back_end.enumerated.TipoAnimale;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Prodotto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "il nome non può essere vuoto")
    private String nome;
    @NotBlank(message = "La marca non può essere vuota")
    private String marca;
    @Positive(message = "Il prezzo deve essere positivo")
    private double prezzo;
    @NotBlank(message = "La descrizione non può essere vuota")
    private String descrizione;
    @Enumerated(EnumType.STRING)
    private TipoAnimale tipoAnimale;
    @NotBlank(message="Immagineurl non può essere vuota")
    private String immagineUrl;
    @NotBlank(message = "il tipo prodotto non può essere vuoto")
    private String tipoProdotto;
}
