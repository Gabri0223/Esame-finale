package it.epicode.Back_end.controller;

import it.epicode.Back_end.dto.CarrelloDto;
import it.epicode.Back_end.dto.ElementoCarrelloDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Carrello;
import it.epicode.Back_end.model.Utente;
import it.epicode.Back_end.security.JwtTool;
import it.epicode.Back_end.service.CarrelloService;
import it.epicode.Back_end.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Carrello")
public class CarrelloController {

    @Autowired
    private CarrelloService carrelloService;
    @Autowired
    private JwtTool jwtTool;

    @GetMapping()
    public List<Carrello> prendiCarrelli(){
        return carrelloService.prendiCarrelli();
    }

    @GetMapping("/daToken")
    public Carrello prendiCarrello(@RequestHeader("Authorization")String token) throws NotFoundException {
        return carrelloService.prendiCarrelloDaUtente(token);
    }

    @PostMapping()
    public Carrello salvaCarrello(@RequestBody @Validated CarrelloDto carrelloDto) throws NotFoundException {
        return carrelloService.salvaCarrello(carrelloDto);
    }

    @PostMapping("/unisci")
    public Carrello unisciCarrelli(@RequestBody CarrelloDto carrelloDto, @RequestHeader("Authorization")String token) throws NotFoundException {

        token = token.replace("Bearer ", "");
        Utente utente = jwtTool.UtentedaToken(token);
        if (utente.getCarrello() != null) {
            carrelloService.unisciCarrelli(utente.getCarrello(), carrelloDto);
            return utente.getCarrello();
        }

        return carrelloService.creaDaDto(carrelloDto, utente);
    }

   //Il carrello non viene mai eliminato nel mio progetto perciò non creo un metodo deleteCarrello
}
