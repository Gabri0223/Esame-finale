package it.epicode.Back_end.dto;

import lombok.Data;

@Data
public class ElementoCarrelloDto {
    private Long id;
    private int quantita;
    private Long prodottoId;
    private double prezzoTotale;
    private Long carrelloId;
    private String taglia;
}
