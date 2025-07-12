package it.epicode.Back_end.service;

import it.epicode.Back_end.dto.LoginDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Utente;
import it.epicode.Back_end.repository.UtenteRepository;
import it.epicode.Back_end.security.JwtTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UtenteRepository utenteRepository;
    @Autowired
    private JwtTool jwtTool;
    @Autowired
    private PasswordEncoder encoder;

    public String login(LoginDto loginDto) throws NotFoundException {
        Utente utente=utenteRepository.findByUsername(loginDto.getUsername()).orElseThrow(()->new NotFoundException("Utente non trovato"));
        if (encoder.matches(loginDto.getPassword(),utente.getPassword())){
            return jwtTool.creazioneToken(utente);
        }else{
            throw new NotFoundException("Password non corretta");
        }
    }
}
