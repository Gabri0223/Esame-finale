package it.epicode.Back_end.controller;

import it.epicode.Back_end.dto.AttrezzaturaDto;
import it.epicode.Back_end.dto.CiboDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Cibo;
import it.epicode.Back_end.service.CiboService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cibo")
public class CiboController {
    @Autowired
    private CiboService ciboService;

    @GetMapping("{id}")
    public Cibo prendiCibo(@PathVariable Long id) throws NotFoundException {
        return ciboService.prendiCIbo(id);
    }

    @GetMapping()
    public Page<Cibo> prendiCibi(@RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "10") int size){
        return ciboService.prendiCibi(page,size);
    }

    @PostMapping()
    public Cibo salvaCibo(@RequestBody @Validated CiboDto ciboDto){
        return ciboService.salvaCibo(ciboDto);
    }

    @PutMapping("{id}")
    public Cibo modificaCibo(@PathVariable Long id, @RequestBody @Validated CiboDto ciboDto ) throws NotFoundException {
        return ciboService.modificaCibo(id,ciboDto);
    }

    @DeleteMapping("{id}")
    public void eliminaCIbo(@PathVariable Long id) throws NotFoundException {
        ciboService.eliminaCibo(id);
    }

    @GetMapping("/search")
    public Page<CiboDto> cercaPerNome(@RequestParam(name = "query",required = false,defaultValue = "") String nome,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "10") int size){
        return ciboService.cercaPerNome(nome,page,size);
    }
}
