package it.epicode.Back_end.model;

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

    @ManyToOne
    private Carrello carrello;
    @ManyToOne
    private Prodotto prodotto;
}
