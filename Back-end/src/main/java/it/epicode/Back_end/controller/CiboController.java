package it.epicode.Back_end.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
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


@RestController
@RequestMapping("/cibo")
public class CiboController {
    @Autowired
    private CiboService ciboService;
    @Autowired
    private CloudinaryService cloudinaryService;
    @Autowired
    private ObjectMapper objectMapper;

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

    @PostMapping(value = "/modificaCibo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Cibo modificaCibo(
            @RequestParam("cibo") String ciboJson,
            @RequestParam(value = "immagine", required = false) MultipartFile immagineFile) throws IOException, NotFoundException {

        CiboDto ciboDto = objectMapper.readValue(ciboJson, CiboDto.class);

        if (immagineFile != null && !immagineFile.isEmpty()) {
            String urlImmagine = cloudinaryService.uploadImage(immagineFile);
            ciboDto.setImmagineUrl(urlImmagine);
        }
        Long id = ciboDto.getId();
       return ciboService.modificaCibo(id, ciboDto);
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
