package it.epicode.Back_end.service;

import it.epicode.Back_end.dto.PrenotazioneDto;
import it.epicode.Back_end.enumerated.TagliaCane;
import it.epicode.Back_end.enumerated.TipoSpecialista;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Prenotazione;
import it.epicode.Back_end.model.Utente;
import it.epicode.Back_end.repository.PrenotazioneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


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
        Utente utente = utenteService.getUtente(prenotazioneDto.getUtenteId());

        Prenotazione prenotazione = new Prenotazione();
        prenotazione.setDataPrenotazione(prenotazioneDto.getDataPrenotazione());
        prenotazione.setSpecialista(prenotazioneDto.getSpecialista());
        prenotazione.setUtente(utente);

        if (prenotazioneDto.getSpecialista() == TipoSpecialista.TOELETTATORE) {
            if (prenotazioneDto.getTagliaCane() == null) {
                throw new IllegalArgumentException("La taglia del cane è obbligatoria per il toelettatore");
            }
            prenotazione.setTagliaCane(prenotazioneDto.getTagliaCane());
            prenotazione.setPrezzo(calcolaPrezzoToelettatura(prenotazioneDto.getTagliaCane()));
        } else {
            prenotazione.setPrezzo(0);
        }

        return prenotazioneRepository.save(prenotazione);
    }

    public Prenotazione modificaPrenotazione(Long id,PrenotazioneDto prenotazioneDto) throws NotFoundException {

        Prenotazione prenotazioneDaModificare=prendiPrenotazione(id);

        prenotazioneDaModificare.setDataPrenotazione(prenotazioneDto.getDataPrenotazione());
        prenotazioneDaModificare.setSpecialista(prenotazioneDto.getSpecialista());
        prenotazioneDaModificare.setUtente(utenteService.getUtente(prenotazioneDto.getUtenteId()));

        return prenotazioneRepository.save( prenotazioneDaModificare);
    }

    public double calcolaPrezzoToelettatura(TagliaCane taglia) {
        switch (taglia) {
            case PICCOLA:
                return 10.0;
            case MEDIA:
                return 14.0;
            case GRANDE:
                return 18.0;
            default:
                throw new IllegalArgumentException("Taglia non valida");
        }
    }

        public void eliminaPrenotazione(Long id) throws NotFoundException {
        prenotazioneRepository.delete(prendiPrenotazione(id));
    }
}
