package it.epicode.Back_end.controller;

import it.epicode.Back_end.dto.CarrelloDto;
import it.epicode.Back_end.dto.ElementoCarrelloDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Carrello;
import it.epicode.Back_end.service.CarrelloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Carrello")
public class CarrelloController {

    @Autowired
    private CarrelloService carrelloService;

    @GetMapping()
    public List<Carrello> prendiCarrelli(){
        return carrelloService.prendiCarrelli();
    }

    @GetMapping("/{id}")
    public Carrello prendiCarrello(@PathVariable Long id) throws NotFoundException {
        return carrelloService.prendiCarrello(id);
    }

    @PostMapping()
    public Carrello salvaCarrello(@RequestBody @Validated CarrelloDto carrelloDto) throws NotFoundException {
        return carrelloService.salvaCarrello(carrelloDto);
    }
    
}
