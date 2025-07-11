package it.epicode.Back_end.controller;

import it.epicode.Back_end.dto.AttrezzaturaDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Attrezzatura;
import it.epicode.Back_end.service.AttrezzaturaService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Attrezzatura> prendiAttrezzature(){
        return attrezzaturaService.prendiAttrezzature();
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

}
