package it.epicode.Back_end.controller;

import it.epicode.Back_end.dto.LoginDto;
import it.epicode.Back_end.dto.PrenotazioneDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Prenotazione;
import it.epicode.Back_end.service.PrenotazioneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prenotazione")
public class PrenotazioneController {
    @Autowired
    private PrenotazioneService prenotazioneService;

    @GetMapping("/{id}")
    public Prenotazione prendiPrenotazione(@PathVariable Long id) throws NotFoundException {
        return prenotazioneService.prendiPrenotazione(id);
    }v

    @GetMapping()
    public List<Prenotazione> prendiPrenotazioni(){
        return prenotazioneService.prendiPrenotazioni();
    }

    @PostMapping()
    public Prenotazione salvaPrenotazione(@RequestBody @Validated  PrenotazioneDto prenotazioneDto) throws NotFoundException {
        return prenotazioneService.salvaPrenotazione(prenotazioneDto);
    }

    @PutMapping("/{id}")
    public Prenotazione modificaPrenotazione(@RequestBody @Validated PrenotazioneDto prenotazioneDto,@PathVariable Long id ) throws NotFoundException {
        return prenotazioneService.modificaPrenotazione(id,prenotazioneDto);
    }

    @DeleteMapping("/{id}")
    public void eliminaPrenotazione (@PathVariable Long id) throws NotFoundException {
        prenotazioneService.eliminaPrenotazione(id);
    }
}
