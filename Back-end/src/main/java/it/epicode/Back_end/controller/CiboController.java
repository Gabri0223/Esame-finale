package it.epicode.Back_end.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.epicode.Back_end.dto.AttrezzaturaDto;
import it.epicode.Back_end.dto.CiboDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Cibo;
import it.epicode.Back_end.service.CiboService;
import it.epicode.Back_end.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/cibo")
public class CiboController {
    @Autowired
    private CiboService ciboService;
    @Autowired
    private CloudinaryService cloudinaryService;


    @GetMapping("{id}")
    public Cibo prendiCibo(@PathVariable Long id) throws NotFoundException {
        return ciboService.prendiCIbo(id);
    }

    @GetMapping()
    public Page<Cibo> prendiCibi(@RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "10") int size){
        return ciboService.prendiCibi(page,size);
    }

    @PostMapping(value = "", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Cibo salvaCibo(@RequestPart("cibo") String ciboJson,
                          @RequestPart("immagine") MultipartFile file) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        CiboDto ciboDto = mapper.readValue(ciboJson, CiboDto.class);
        String imageUrl = cloudinaryService.uploadImage(file);
        return ciboService.salvaCibo(ciboDto, imageUrl);
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
