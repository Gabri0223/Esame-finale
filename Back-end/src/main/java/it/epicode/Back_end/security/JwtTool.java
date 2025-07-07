package it.epicode.Back_end.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Utente;
import it.epicode.Back_end.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTool {
    @Autowired
    private UtenteService utenteService;

    @Value("${jwt.duration}")
    private Long durata;
    @Value("${jwt.secret}")
    private String chiaveSegreta;

    public String creazioneToken(Utente utente){
        return Jwts.builder().issuedAt(new Date()).expiration(new Date(System.currentTimeMillis()+durata))
                .subject((utente.getId()+""))
                .signWith(Keys.hmacShaKeyFor(chiaveSegreta.getBytes())).compact();
    }
    public void validazioneToken(String token){
        Jwts.parser().verifyWith(Keys.hmacShaKeyFor(chiaveSegreta.getBytes())).build().parse(token);
    }

    public Utente UtentedaToken(String token) throws NotFoundException {
        Long id=Long.parseLong(Jwts.parser().verifyWith(Keys.hmacShaKeyFor(chiaveSegreta.getBytes())).build().parseSignedClaims(token).getPayload().getSubject());
        return utenteService.getUtente(id);
    }
}
