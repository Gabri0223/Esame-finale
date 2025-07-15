package it.epicode.Back_end.model;

import it.epicode.Back_end.enumerated.TipoAttrezzatura;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Attrezzatura extends Prodotto{

    @Enumerated(value = EnumType.STRING)
    private TipoAttrezzatura tipoAttrezzatura;
}
