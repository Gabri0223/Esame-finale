package it.epicode.Back_end.repository;

import it.epicode.Back_end.model.Utente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UtenteRepository extends JpaRepository<Utente,Long> {
    public Optional<Utente>findByUsername(String username);
    boolean existsByUsername(String username);
}
