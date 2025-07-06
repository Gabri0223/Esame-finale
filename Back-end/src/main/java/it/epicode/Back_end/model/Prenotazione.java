package it.epicode.Back_end.model;

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

    @NotNull
    private LocalDate dataPrenotazione;
    @Enumerated(EnumType.STRING)
    private TipoSpecialista specialista;
    @ManyToOne
    @JoinColumn(name="utente_id")
    private Utente utente;
}
