package it.epicode.Back_end.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.epicode.Back_end.dto.AttrezzaturaDto;
import it.epicode.Back_end.dto.CiboDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Attrezzatura;
import it.epicode.Back_end.model.Cibo;
import it.epicode.Back_end.service.AttrezzaturaService;
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
@RequestMapping("/attrezzatura")
public class AttrezzaturaController {

    @Autowired
    private AttrezzaturaService attrezzaturaService;
    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping("{id}")
    public Attrezzatura prendiAttrezzatura(@PathVariable Long id) throws NotFoundException {
        return attrezzaturaService.prendiAttrezzatura(id);
    }

    @GetMapping
    public Page<Attrezzatura> prendiAttrezzature(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int size){
        return attrezzaturaService.prendiAttrezzature(page,size);
    }

    @PostMapping(value = "", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Attrezzatura salvaAttrezzatura(@RequestPart("attrezzatura") String attrezzaturaJson,
                          @RequestPart("immagine") MultipartFile file) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        AttrezzaturaDto attrezzaturaDto= mapper.readValue(attrezzaturaJson, AttrezzaturaDto.class);
        String imageUrl = cloudinaryService.uploadImage(file);
        return attrezzaturaService.salvaAttrezzatura(attrezzaturaDto, imageUrl);
    }

    @PutMapping("{id}")
    public Attrezzatura modificaAttrezzatura(@PathVariable Long id,@RequestBody @Validated AttrezzaturaDto attrezzaturaDto) throws NotFoundException {
        return attrezzaturaService.modificaAttrezzatura(id,attrezzaturaDto);
    }

    @DeleteMapping("{id}")
    public void eliminaAttrezzatura(@PathVariable Long id) throws NotFoundException {
        attrezzaturaService.eliminaAttrezzatura(id);
    }

    @GetMapping("/search")
    public Page<AttrezzaturaDto> cercaPerKeyword(@RequestParam(name = "query", required = false,defaultValue = "") String keyword,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "5") int size){

        return attrezzaturaService.cercaPerKeyword(keyword,page,size);
    }
}
