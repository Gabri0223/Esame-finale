package it.epicode.Back_end.controller;

import it.epicode.Back_end.dto.CodiceScontoDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.CodiceSconto;
import it.epicode.Back_end.service.CodiceScontoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/codiceSconto")
public class CodiceScontoController {

    @Autowired
    private CodiceScontoService codiceScontoService;

    @GetMapping
    public List<CodiceSconto> prendiCodiciSconto(){
        return codiceScontoService.prendiCodiciSconto();
    }

    @GetMapping("/{id}")
    public CodiceSconto prendiCodiceSconto(@PathVariable Long id) throws NotFoundException {
        return codiceScontoService.prendiCodiceSconto(id);
    }

    @PostMapping()
    public CodiceSconto salvaCodiceSconto(@RequestBody @Validated CodiceScontoDto codiceScontoDto){
        return codiceScontoService.creaCodiceSconto(codiceScontoDto);
    }

    @PutMapping("/{id}")
    public CodiceSconto modificaCodiceSconto(@PathVariable Long id,@RequestBody @Validated CodiceScontoDto codiceScontoDto) throws NotFoundException {
        return codiceScontoService.modificaCodiceSconto(id,codiceScontoDto);
    }

    @GetMapping("/verifica")
    public CodiceSconto verificaCodiceSconto(@RequestParam String codiceSconto){
        return codiceScontoService.verificaCodiceSconto(codiceSconto);
    }

    @DeleteMapping("/{id}")
    public void eliminaCOdiceSconto(@PathVariable Long id) throws NotFoundException {
        codiceScontoService.eliminaCodiceSconto(id);
    }
}
