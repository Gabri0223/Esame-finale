package it.epicode.Back_end.model;

import it.epicode.Back_end.enumerated.TagliaCane;
import it.epicode.Back_end.enumerated.TipoSpecialista;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class Prenotazione {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull(message = "La data non può essere nulla")
    private LocalDate dataPrenotazione;
    @Enumerated(EnumType.STRING)
    private TipoSpecialista specialista;
    @Enumerated(EnumType.STRING)
    private TagliaCane tagliaCane;
    @ManyToOne
    @JoinColumn(name="utente_id")
    private Utente utente;
    private double prezzo;
}
