package it.epicode.Back_end.model;

import it.epicode.Back_end.enumerated.StatoRuolo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;


@Data
@Entity
public class Utente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String nome;
    @NotBlank
    private String cognome;
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    @Enumerated
    private StatoRuolo ruolo;

    @OneToMany(mappedBy = "utente")
    private List<Prenotazione> prenotazioni= new ArrayList<>();
}
