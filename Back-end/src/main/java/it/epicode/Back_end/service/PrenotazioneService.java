package it.epicode.Back_end.service;

import it.epicode.Back_end.dto.PrenotazioneDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Prenotazione;
import it.epicode.Back_end.repository.PrenotazioneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Service
public class PrenotazioneService {
    @Autowired
    private PrenotazioneRepository prenotazioneRepository;
    @Autowired
    private UtenteService utenteService;

    public List<Prenotazione> prendiPrenotazioni(){
        return prenotazioneRepository.findAll();
    }


    public Prenotazione prendiPrenotazione(Long id) throws NotFoundException {
        return prenotazioneRepository.findById(id).orElseThrow(()->new NotFoundException("prenotazione non trovata"));
    }

    public Prenotazione salvaPrenotazione(PrenotazioneDto prenotazioneDto) throws NotFoundException {

        Prenotazione prenotazione = new Prenotazione();

        prenotazione.setDataPrenotazione(prenotazioneDto.getDataPrenotazione());
        prenotazione.setUtente(utenteService.getUtente(prenotazioneDto.getUtenteId()));
        prenotazione.setSpecialista(prenotazioneDto.getSpecialista());

        return prenotazioneRepository.save(prenotazione);
    }

    public Prenotazione modificaPrenotazione(Long id,PrenotazioneDto prenotazioneDto) throws NotFoundException {

        Prenotazione prenotazioneDaModificare=prendiPrenotazione(id);

        prenotazioneDaModificare.setDataPrenotazione(prenotazioneDto.getDataPrenotazione());
        prenotazioneDaModificare.setSpecialista(prenotazioneDto.getSpecialista());
        prenotazioneDaModificare.setUtente(utenteService.getUtente(prenotazioneDto.getUtenteId()));

        return prenotazioneRepository.save( prenotazioneDaModificare);
    }

    public void eliminaPrenotazione(Long id) throws NotFoundException {
        prenotazioneRepository.delete(prendiPrenotazione(id));
    }
}
