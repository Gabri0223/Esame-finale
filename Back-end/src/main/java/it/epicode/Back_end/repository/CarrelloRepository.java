package it.epicode.Back_end.repository;

import it.epicode.Back_end.model.Carrello;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarrelloRepository extends JpaRepository<Carrello,Long> {
}
