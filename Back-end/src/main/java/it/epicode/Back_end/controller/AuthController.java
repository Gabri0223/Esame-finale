package it.epicode.Back_end.controller;

import it.epicode.Back_end.dto.LoginDto;
import it.epicode.Back_end.dto.UtenteDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.exception.ValidationException;
import it.epicode.Back_end.model.Utente;
import it.epicode.Back_end.service.AuthService;
import it.epicode.Back_end.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UtenteService utenteService;
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public Utente registrazione(@RequestBody @Validated UtenteDto utenteDto, BindingResult bindingResult) throws ValidationException {
        if (bindingResult.hasErrors()){
            throw new ValidationException(bindingResult.getAllErrors().stream()
                    .map(objectError -> objectError.getDefaultMessage())
                    .reduce("",(e,s)->e+s));
        }
        return utenteService.saveUtente(utenteDto);
    }

    @PostMapping("/login")
    public String login(@RequestBody @Validated LoginDto loginDto, BindingResult bindingResult) throws ValidationException, NotFoundException {
        if(bindingResult.hasErrors()){
            throw new ValidationException(bindingResult.getAllErrors().stream().map(objectError -> objectError.getDefaultMessage()).reduce("",(e,s)->e+s));
        }
        return authService.login(loginDto);
    }



}
