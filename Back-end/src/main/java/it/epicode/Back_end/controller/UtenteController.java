package it.epicode.Back_end.controller;


import it.epicode.Back_end.dto.UtenteDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.exception.ValidationException;
import it.epicode.Back_end.model.Utente;
import it.epicode.Back_end.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/utente")
public class UtenteController {

    @Autowired
    private UtenteService utenteService;

    @PutMapping("/{id}")
    public Utente modificaUtente(@PathVariable Long id , @RequestBody @Validated UtenteDto utenteDto, BindingResult bindingResult) throws ValidationException, NotFoundException {
        if (bindingResult.hasErrors()){
            throw new ValidationException(bindingResult.getAllErrors().stream().map(objectError -> objectError.getDefaultMessage()).reduce("",(e,s)->e+s));
        }
        return utenteService.modificaUtente(id,utenteDto);
    }

    @GetMapping()
    public List<Utente> prendiUtenti(){
        return utenteService.getAllUtenti();
    }

    @GetMapping("/{id}")
    public Utente premdiUtente(@PathVariable Long id) throws NotFoundException {
        return utenteService.getUtente(id);
    }

    @DeleteMapping("/{id}")
    public void eliminaUtente(@PathVariable Long id) throws NotFoundException {
        utenteService.eliminaUtente(id);
    }
}
