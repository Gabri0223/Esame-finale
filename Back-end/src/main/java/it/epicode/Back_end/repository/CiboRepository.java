package it.epicode.Back_end.repository;

import it.epicode.Back_end.model.Cibo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CiboRepository extends JpaRepository<Cibo,Long> {
}
