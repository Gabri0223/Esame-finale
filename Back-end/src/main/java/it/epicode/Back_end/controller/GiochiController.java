package it.epicode.Back_end.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.epicode.Back_end.dto.AttrezzaturaDto;
import it.epicode.Back_end.dto.GiochiDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Attrezzatura;
import it.epicode.Back_end.model.Giochi;
import it.epicode.Back_end.service.CloudinaryService;
import it.epicode.Back_end.service.GiochiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/giochi")
public class GiochiController {
    @Autowired
    private GiochiService giochiService;
    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping("{id}")
    public Giochi prendiGioco (@PathVariable Long id) throws NotFoundException {
        return giochiService.prendiGioco(id);
    }

    @GetMapping
    public Page<Giochi> prendiGiochi(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int size){
        return giochiService.prendiGiochi(page,size);
    }

    @PostMapping(value = "", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Giochi salvaGiochi(@RequestPart("gioco") String giochiJson,
                                          @RequestPart("immagine") MultipartFile file) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        GiochiDto giochiDto= mapper.readValue(giochiJson, GiochiDto.class);
        String imageUrl = cloudinaryService.uploadImage(file);
        return giochiService.salvaGiochi(giochiDto, imageUrl);
    }

    @PutMapping("{id}")
    public Giochi modificaGiochi(@PathVariable Long id,@RequestBody @Validated GiochiDto giochiDto) throws NotFoundException {
        return giochiService.modificaGiochi(id,giochiDto);
    }

    @DeleteMapping("{id}")
    public void eliminaGiochi(@PathVariable Long id) throws NotFoundException {giochiService.eliminaGioco(id);
    }

    @GetMapping("/search")
    public Page<GiochiDto> cercaPerKeyword(@RequestParam(name = "query", required = false,defaultValue = "") String keyword,
                                                 @RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "5") int size,
                                           @RequestParam(name = "sort", required = false, defaultValue = "id,asc") String sort){

        Pageable pageable = PageRequest.of(page, size, Sort.by(parseSort(sort)));
        return giochiService.cercaPerKeyword(keyword,pageable);
    }

    private Sort.Order parseSort(String sort) {
        String[] parts = sort.split(",");
        if(parts.length < 2) {
            return new Sort.Order(Sort.Direction.ASC, parts[0]);
        }
        Sort.Direction direction = Sort.Direction.fromString(parts[1]);
        return new Sort.Order(direction, parts[0]);
    }
}
