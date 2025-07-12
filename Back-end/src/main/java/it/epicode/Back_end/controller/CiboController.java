package it.epicode.Back_end.controller;

import it.epicode.Back_end.dto.CiboDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Cibo;
import it.epicode.Back_end.service.CiboService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Cibo> prendiCibi(){
        return ciboService.prendiCibi();
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
}
