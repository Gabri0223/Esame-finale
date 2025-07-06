package it.epicode.Back_end.repository;

import it.epicode.Back_end.model.Prenotazione;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrenotazioneRepository extends JpaRepository<Prenotazione,Long> {
}
