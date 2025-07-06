package it.epicode.Back_end.repository;

import it.epicode.Back_end.model.Utente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtenteRepository extends JpaRepository<Utente,Long> {
}
