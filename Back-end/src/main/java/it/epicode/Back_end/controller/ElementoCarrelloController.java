package it.epicode.Back_end.controller;

import it.epicode.Back_end.dto.ElementoCarrelloDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Carrello;
import it.epicode.Back_end.model.ElementoCarrello;
import it.epicode.Back_end.service.CarrelloService;
import it.epicode.Back_end.service.ElementoCarrelloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/elementi")
public class ElementoCarrelloController {
    @Autowired
    private ElementoCarrelloService elementoCarrelloService;
    @Autowired
    private CarrelloService carrelloService;

    @GetMapping
    public List<ElementoCarrello> prendiElementi(){
        return elementoCarrelloService.prendiElementi();
    }

    @GetMapping("/{id}")
    public ElementoCarrello prendiElemento(@PathVariable Long id) throws NotFoundException {
        return elementoCarrelloService.prendiElemento(id);
    }

    @PostMapping()
    public ElementoCarrello salvaElemento(@RequestBody @Validated ElementoCarrelloDto elementoCarrelloDto,  @RequestHeader("Authorization") String token) throws NotFoundException {
        Carrello carrello= carrelloService.prendiCarrelloDaUtente(token);
        return elementoCarrelloService.salvaELemento(elementoCarrelloDto, carrello);
    }

    @PutMapping("{id}")
    public ElementoCarrello modificaQuantità(@PathVariable Long id ,int nuovaQuantita) throws NotFoundException {
        return elementoCarrelloService.modificaQuantità(id,nuovaQuantita);
    }

    @DeleteMapping("/{id}")
    public void elimaElemento(@PathVariable Long id) throws NotFoundException {
        elementoCarrelloService.eliminaElemento(id);
    }
}
