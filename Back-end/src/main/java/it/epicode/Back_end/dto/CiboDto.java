package it.epicode.Back_end.dto;

import lombok.Data;

@Data
public class CiboDto {

    private Long id;
    private String nome;
    private String marca;
    private double prezzo;
    private String descrizione;
    private String tipoAnimale;
    private String tipoCibo;
    private String etaAnimale;
    private String tagliaAnimale;
    private String immagineUrl;
    private String tipoProdotto;
    private String tagliaAttrezzatura;
}
