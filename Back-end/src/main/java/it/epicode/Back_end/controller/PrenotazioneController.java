package it.epicode.Back_end.controller;

import it.epicode.Back_end.dto.LoginDto;
import it.epicode.Back_end.dto.PrenotazioneDto;
import it.epicode.Back_end.enumerated.TipoSpecialista;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Prenotazione;
import it.epicode.Back_end.model.Utente;
import it.epicode.Back_end.security.JwtTool;
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
    @Autowired
    private JwtTool jwtTool;
    @GetMapping("/{id}")
    public Prenotazione prendiPrenotazione(@PathVariable Long id) throws NotFoundException {
        return prenotazioneService.prendiPrenotazione(id);
    }

    @GetMapping()
    public List<Prenotazione> prendiPrenotazioni(){
        return prenotazioneService.prendiPrenotazioni();
    }

    @PostMapping("/{tipoSpecialista}")
    public Prenotazione salvaPrenotazione(@RequestBody @Validated  PrenotazioneDto prenotazioneDto, @PathVariable TipoSpecialista tipoSpecialista, @RequestHeader("Authorization") String token) throws NotFoundException {
        Utente utente = jwtTool.UtentedaToken(token);
        prenotazioneDto.setUtenteId(utente.getId());
        return prenotazioneService.salvaPrenotazione(prenotazioneDto, tipoSpecialista);
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
