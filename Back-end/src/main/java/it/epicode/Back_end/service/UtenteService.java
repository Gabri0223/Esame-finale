package it.epicode.Back_end.service;

import it.epicode.Back_end.dto.UtenteDto;
import it.epicode.Back_end.enumerated.StatoRuolo;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.exception.UtenteGiaEsistenteException;
import it.epicode.Back_end.model.Utente;
import it.epicode.Back_end.repository.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UtenteService {

    @Autowired
    private UtenteRepository utenteRepository;
    @Autowired
    private PasswordEncoder encoder;

    public Utente getUtente(Long id) throws NotFoundException {
        return utenteRepository.findById(id).orElseThrow(()->new NotFoundException("utente non trovato"));
    }

    public List<Utente> getAllUtenti(){
        return utenteRepository.findAll();
    }

    public Utente saveUtente(UtenteDto utenteDto) throws UtenteGiaEsistenteException {
        Utente nuovoUtente = new Utente();
        nuovoUtente.setNome(utenteDto.getNome());
        nuovoUtente.setCognome(utenteDto.getCognome());
        if(utenteRepository.existsByUsername(utenteDto.getUsername())){
            throw new UtenteGiaEsistenteException("L'utente è già esistente");
        }
        nuovoUtente.setUsername(utenteDto.getUsername());

        String hasledPassword=encoder.encode(utenteDto.getPassword());
        nuovoUtente.setPassword(hasledPassword);
        nuovoUtente.setImgUrl(utenteDto.getImgUrl());
        nuovoUtente.setRuolo(StatoRuolo.Utente);
        return utenteRepository.save(nuovoUtente);
    }

    public Utente modificaUtente(Long id, UtenteDto utenteDto) throws NotFoundException {
        Utente utenteDaModificare= getUtente(id);
        utenteDaModificare.setNome(utenteDto.getNome());
        utenteDaModificare.setCognome(utenteDto.getCognome());
        utenteDaModificare.setUsername(utenteDto.getUsername());
        utenteDaModificare.setImgUrl(utenteDto.getImgUrl());
        utenteDaModificare.setPassword(encoder.encode(utenteDto.getPassword()));

        return utenteRepository.save(utenteDaModificare);

    }

    public void eliminaUtente(Long id) throws NotFoundException {
    utenteRepository.delete(getUtente(id));
    }
}
