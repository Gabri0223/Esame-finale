package it.epicode.Back_end.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Entity
@Data
public class ElementoCarrello {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Positive
    private int quantita;
    private double prezzoTotale;
    private String taglia;
    @ManyToOne
    @JsonIgnore
    private Carrello carrello;
    @ManyToOne
    private Prodotto prodotto;
}
