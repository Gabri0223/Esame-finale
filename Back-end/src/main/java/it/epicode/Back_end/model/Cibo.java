package it.epicode.Back_end.model;

import it.epicode.Back_end.enumerated.EtaAnimale;
import it.epicode.Back_end.enumerated.TagliaAnimale;
import it.epicode.Back_end.enumerated.TipoCibo;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Cibo extends Prodotto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private TipoCibo tipoCibo;
    @Enumerated(EnumType.STRING)
    private EtaAnimale etaAnimale;
    @Enumerated(EnumType.STRING)
    private TagliaAnimale tagliaAnimale;

}
