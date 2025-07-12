package it.epicode.Back_end.model;

import it.epicode.Back_end.enumerated.StatoRuolo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Data
@Entity
public class Utente implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Il nomme non può essere vuoto")
    private String nome;
    @NotBlank(message="Il cognome non può essere vuoto")
    private String cognome;
    @NotBlank(message = "l'username non può essere vuoto")
    private String username;
    @NotBlank(message = "la password non può essere vuota")
    private String password;
    private String imgUrl;
    @Enumerated(value = EnumType.STRING)
    private StatoRuolo ruolo;

    @OneToMany(mappedBy = "utente")
    private List<Prenotazione> prenotazioni= new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority( ruolo.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}


