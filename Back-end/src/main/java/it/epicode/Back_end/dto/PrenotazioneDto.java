package it.epicode.Back_end.dto;


import it.epicode.Back_end.enumerated.TipoSpecialista;
import lombok.Data;
import java.time.LocalDate;

@Data
public class PrenotazioneDto {

    private LocalDate dataPrenotazione;
    private TipoSpecialista specialista;
    private Long utenteId;
    private String tagliaCane;
    private String Nome;
    private String cognome;
    private String email;
    private String fasciaOraria;
    private String dettagliAggiuntivi;
}
