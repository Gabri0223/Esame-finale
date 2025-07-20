package it.epicode.Back_end.controller;

import it.epicode.Back_end.dto.ElementoCarrelloDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.ElementoCarrello;
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

    @GetMapping
    public List<ElementoCarrello> prendiElementi(){
        return elementoCarrelloService.prendiElementi();
    }

    @GetMapping("/{id}")
    public ElementoCarrello prendiElemento(@PathVariable Long id) throws NotFoundException {
        return elementoCarrelloService.prendiElemento(id);
    }

    @PostMapping()
    public ElementoCarrello salvaElemento(@RequestBody @Validated ElementoCarrelloDto elementoCarrelloDto) throws NotFoundException {
        return elementoCarrelloService.salvaELemento(elementoCarrelloDto);
    }
    @PutMapping("{id}")
    public ElementoCarrello modificaQuantità(@PathVariable Long id ,int nuovaQuantita) throws NotFoundException {
        return elementoCarrelloService.modificaQuantità(id,nuovaQuantita);
    }

    @PutMapping()
    public ElementoCarrello aggiungiAlCarrello( @RequestBody @Validated ElementoCarrelloDto elementoCarrelloDto) throws NotFoundException {
    return elementoCarrelloService.aggiungiAlCarrello(elementoCarrelloDto);
    }

    @DeleteMapping("/{id}")
    public void elimaElemento(@PathVariable Long id) throws NotFoundException {
        elementoCarrelloService.eliminaElemento(id);
    }
}
