package it.epicode.Back_end.controller;

import it.epicode.Back_end.dto.LoginDto;
import it.epicode.Back_end.dto.TokenResponseDto;
import it.epicode.Back_end.dto.UtenteDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.exception.UtenteGiaEsistenteException;
import it.epicode.Back_end.exception.ValidationException;
import it.epicode.Back_end.model.Utente;
import it.epicode.Back_end.security.JwtTool;
import it.epicode.Back_end.service.AuthService;
import it.epicode.Back_end.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UtenteService utenteService;
    @Autowired
    private AuthService authService;
    @Autowired
    private JwtTool jwtTool;

    @PostMapping("/register")
    public TokenResponseDto registrazione(@RequestBody @Validated UtenteDto utenteDto, BindingResult bindingResult) throws ValidationException, UtenteGiaEsistenteException {
        if (bindingResult.hasErrors()){
            throw new ValidationException(bindingResult.getAllErrors().stream()
                    .map(objectError -> objectError.getDefaultMessage())
                    .reduce("",(e,s)->e+s));
        }
        Utente nuovoUtente= utenteService.saveUtente(utenteDto);
        return new TokenResponseDto(jwtTool.creazioneToken(nuovoUtente));
    }

    @PostMapping("/login")
    public TokenResponseDto login(@RequestBody @Validated LoginDto loginDto, BindingResult bindingResult) throws ValidationException, NotFoundException {
        if(bindingResult.hasErrors()){
            throw new ValidationException(bindingResult.getAllErrors().stream().map(objectError -> objectError.getDefaultMessage()).reduce("",(e,s)->e+s));
        }
        String token = authService.login(loginDto);
        return new TokenResponseDto(token);
    }

    @GetMapping
    public Utente estrazioneUtente(@RequestHeader("Authorization") String header) throws NotFoundException {
        String token = header.replace("Bearer ", "");
        return jwtTool.UtentedaToken(token);
    }


}
