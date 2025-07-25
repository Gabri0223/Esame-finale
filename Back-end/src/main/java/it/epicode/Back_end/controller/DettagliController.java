package it.epicode.Back_end.controller;

import it.epicode.Back_end.dto.AttrezzaturaDto;
import it.epicode.Back_end.dto.CiboDto;
import it.epicode.Back_end.dto.GiochiDto;
import it.epicode.Back_end.dto.ProdottoCompressoDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Attrezzatura;
import it.epicode.Back_end.model.Cibo;
import it.epicode.Back_end.model.Giochi;
import it.epicode.Back_end.repository.AttrezzaturaRepository;
import it.epicode.Back_end.repository.CiboRepository;
import it.epicode.Back_end.repository.GiochiRepository;
import it.epicode.Back_end.service.AttrezzaturaService;
import it.epicode.Back_end.service.CiboService;
import it.epicode.Back_end.service.GiochiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/dettagli")
public class DettagliController {

    @Autowired
    private CiboRepository ciboRepository;
    @Autowired
    private AttrezzaturaRepository attrezzaturaRepository;
    @Autowired
    private AttrezzaturaService attrezzaturaService;
    @Autowired
    private CiboService ciboService;
    @Autowired
    private GiochiService giochiService;
    @Autowired
    private GiochiRepository giochiRepository;

    @GetMapping("/{id}")
    public ProdottoCompressoDto prendiProdotto(@PathVariable Long id) throws NotFoundException {
        Optional<Cibo> optionalCibo=ciboRepository.findById(id);

        if(optionalCibo.isPresent()){
            Cibo cibo=optionalCibo.get();
            CiboDto ciboDto = ciboService.convertiInDto(cibo);
            return new ProdottoCompressoDto("Cibo",ciboDto, ciboDto.getNome(),cibo.getPrezzo());
        }

        Optional<Attrezzatura> optionalAttrezzatura=attrezzaturaRepository.findById(id);
        if(optionalAttrezzatura.isPresent()){
            Attrezzatura attrezzatura=optionalAttrezzatura.get();
            AttrezzaturaDto attrezzaturaDto= attrezzaturaService.convertiInDto(attrezzatura);
            return new ProdottoCompressoDto("Attrezzatura",attrezzaturaDto,attrezzaturaDto.getNome(),attrezzaturaDto.getPrezzo());
        }

        Optional<Giochi> optionalGiochi=giochiRepository.findById(id);
            if (optionalGiochi.isPresent()){
                Giochi gioco=optionalGiochi.get();
                GiochiDto giocoDto=giochiService.convertiInDto(gioco);
                return new ProdottoCompressoDto("Gioco",giocoDto,giocoDto.getNome(),giocoDto.getPrezzo());
            }
        throw new NotFoundException("Prodotto non trovato");
    }
}
