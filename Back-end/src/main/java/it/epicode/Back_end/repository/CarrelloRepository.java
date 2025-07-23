package it.epicode.Back_end.repository;

import it.epicode.Back_end.model.Carrello;
import it.epicode.Back_end.model.Utente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CarrelloRepository extends JpaRepository<Carrello,Long> {
    Optional<Carrello> findByUtente(Utente utente);
}
