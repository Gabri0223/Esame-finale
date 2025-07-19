package it.epicode.Back_end.repository;

import it.epicode.Back_end.model.Attrezzatura;
import it.epicode.Back_end.model.Giochi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GiochiRepository extends JpaRepository<Giochi,Long> {
    @Query("SELECT g FROM Giochi g WHERE " +
            "LOWER(g.nome) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(g.marca) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(g.tipoGioco) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Giochi> cercaPerKeyword(@Param("keyword") String keyword, Pageable pageable);
}
