package it.epicode.Back_end.repository;

import it.epicode.Back_end.model.Cibo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CiboRepository extends JpaRepository<Cibo,Long> {
    Page<Cibo> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}
