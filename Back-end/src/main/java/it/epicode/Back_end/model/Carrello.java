package it.epicode.Back_end.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Carrello {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "carrello")
    private List<ElementoCarrello> elementiCarrello;
    @OneToOne
    @JoinColumn(name = "utente_id")
    private Utente utente;
}
