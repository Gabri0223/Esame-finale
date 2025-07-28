package it.epicode.Back_end.model;

import it.epicode.Back_end.enumerated.TagliaCane;
import it.epicode.Back_end.enumerated.TipoSpecialista;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
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
    @NotBlank(message= "Il nome non può essere vuoto")
    private String Nome;
    @NotBlank(message = "Il cognome non può essere vuoto")
    private String cognome;
    @Email(message = "Inserisci un'Email valida")
    private String email;
    @NotBlank(message="Inserisci una fascia oraria")
    private String fasciaOraria;
    @Enumerated(EnumType.STRING)
    private TipoSpecialista specialista;
    @Enumerated(EnumType.STRING)

    private TagliaCane tagliaCane;
    private String dettagliAggiuntivi;
    private double prezzo;

    @ManyToOne
    @JoinColumn(name="utente_id")
    private Utente utente;


}
