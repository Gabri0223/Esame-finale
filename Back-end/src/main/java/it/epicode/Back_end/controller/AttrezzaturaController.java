package it.epicode.Back_end.controller;

import it.epicode.Back_end.dto.AttrezzaturaDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Attrezzatura;
import it.epicode.Back_end.service.AttrezzaturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Attrezzatura")
public class AttrezzaturaController {

    @Autowired
    private AttrezzaturaService attrezzaturaService;

    @GetMapping("{id}")
    public Attrezzatura prendiAttrezzatura(Long id) throws NotFoundException {
        return attrezzaturaService.prendiAttrezzatura(id);
    }

    @GetMapping
    public Page<Attrezzatura> prendiAttrezzature(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int size){
        return attrezzaturaService.prendiAttrezzature(page,size);
    }

    @PostMapping("{id}")
    public Attrezzatura salvaAttrezzatura(@RequestBody @Validated AttrezzaturaDto attrezzaturaDto){
        return attrezzaturaService.salvaAttrezzatura(attrezzaturaDto);
    }

    @PutMapping("{id}")
    public Attrezzatura modificaAttrezzatura(@PathVariable Long id,@RequestBody @Validated AttrezzaturaDto attrezzaturaDto) throws NotFoundException {
        return attrezzaturaService.modificaAttrezzatura(id,attrezzaturaDto);
    }

    @DeleteMapping("{id}")
    public void eliminaAttrezzatura(@PathVariable Long id) throws NotFoundException {
        attrezzaturaService.eliminaAttrezzatura(id);
    }

    @GetMapping("/{search}")
    public Page<AttrezzaturaDto> cercaPerNome(@RequestParam(required = false,defaultValue = "") String nome,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "10") int size){
        return attrezzaturaService.cercaPerNome(nome,page,size);
    }
}
