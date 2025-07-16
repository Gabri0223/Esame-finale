package it.epicode.Back_end.repository;

import it.epicode.Back_end.model.Attrezzatura;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AttrezzaturaRepository extends JpaRepository<Attrezzatura,Long> {
    @Query("SELECT a FROM Attrezzatura a WHERE " +
            "LOWER(a.nome) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(a.marca) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(a.tipoAttrezzatura) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Attrezzatura> cercaPerKeyword(@Param("keyword") String keyword, Pageable pageable);
}
