package it.epicode.Back_end.repository;

import it.epicode.Back_end.model.CodiceSconto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CodiceScontoRepository extends JpaRepository<CodiceSconto,Long> {
    Optional<CodiceSconto> findByCodiceSconto(String codiceSconto);

}
