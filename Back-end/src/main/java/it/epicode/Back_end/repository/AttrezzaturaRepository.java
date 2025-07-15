package it.epicode.Back_end.repository;

import it.epicode.Back_end.model.Attrezzatura;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttrezzaturaRepository extends JpaRepository<Attrezzatura,Long> {
    Page<Attrezzatura>findByNomeContaingIgnoreCase(String nome, Pageable pageable);
}
