package it.epicode.Back_end.dto;

import it.epicode.Back_end.enumerated.TagliaCane;
import it.epicode.Back_end.enumerated.TipoSpecialista;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDate;

@Data
public class PrenotazioneDto {

    private LocalDate dataPrenotazione;
    private TipoSpecialista specialista;
    private Long utenteId;
    private TagliaCane tagliaCane;
    private String Nome;
    private String cognome;
    private String email;
    private String fasciaOraria;
    private String dettagliAggiuntivi;
}
