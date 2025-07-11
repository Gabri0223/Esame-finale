package it.epicode.Back_end.model;

import it.epicode.Back_end.enumerated.TipoAttrezzatura;
import jakarta.persistence.*;
import lombok.Data;

@Data
public class Attrezzatura extends Prodotto{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(value = EnumType.STRING)
    private TipoAttrezzatura tipoAttrezzatura;
}
