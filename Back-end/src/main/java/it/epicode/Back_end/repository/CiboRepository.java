package it.epicode.Back_end.repository;

import it.epicode.Back_end.model.Cibo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CiboRepository extends JpaRepository<Cibo,Long> {
    @Query("SELECT c FROM Cibo c WHERE " +
    "LOWER (c.nome) LIKE LOWER (CONCAT('%', :keyword ,'%')) OR " +
    "LOWER (c.marca) LIKE LOWER (CONCAT('%', :keyword , '%')) OR " +
    "LOWER (c.tipoCibo) LIKE LOWER (CONCAT( '%', :keyword ,'%')) OR " +
    "LOWER (c.tipoAnimale) LIKE LOWER (CONCAT( '%', :keyword, '%'))")

    Page<Cibo> findByKeyWord(@Param("keyword") String keyWord, Pageable pageable);
}
