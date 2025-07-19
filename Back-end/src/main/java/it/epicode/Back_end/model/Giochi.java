package it.epicode.Back_end.model;

import it.epicode.Back_end.enumerated.TipoGiochi;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Data;

@Entity
@Data
@PrimaryKeyJoinColumn(name = "id")
public class Giochi extends Prodotto{
    @Enumerated(value = EnumType.STRING)
    private TipoGiochi tipoGioco;
}
