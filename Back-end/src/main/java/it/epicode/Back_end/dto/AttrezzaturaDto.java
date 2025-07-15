package it.epicode.Back_end.dto;

import lombok.Data;

@Data
public class AttrezzaturaDto {

    private Long id;
    private String nome;
    private String marca;
    private double prezzo;
    private String descrizione;
    private String tipoAnimale;
    private String tipoAttrezzatura;
}
