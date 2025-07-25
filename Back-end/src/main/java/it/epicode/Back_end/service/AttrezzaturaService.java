package it.epicode.Back_end.service;

import it.epicode.Back_end.dto.AttrezzaturaDto;
import it.epicode.Back_end.enumerated.TipoAnimale;
import it.epicode.Back_end.enumerated.TipoAttrezzatura;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Attrezzatura;
import it.epicode.Back_end.repository.AttrezzaturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttrezzaturaService {
    @Autowired
    private AttrezzaturaRepository attrezzaturaRepository;

    private void validazioneAttrezzatura(AttrezzaturaDto attrezzaturaDto) {
        TipoAnimale tipoAnimale;
        TipoAttrezzatura tipoAttrezzatura;
        try {
             tipoAnimale = TipoAnimale.valueOf(attrezzaturaDto.getTipoAnimale().toUpperCase());
             tipoAttrezzatura = TipoAttrezzatura.valueOf(attrezzaturaDto.getTipoAttrezzatura().toUpperCase());
        }catch (IllegalArgumentException e){
            throw new IllegalArgumentException("Animale o attrezzatura inseriti non validi");
        }
        if(tipoAttrezzatura == TipoAttrezzatura.COLLARI&&
                (tipoAnimale == TipoAnimale.UCCELLO || tipoAnimale == TipoAnimale.CONIGLIO)){
            throw new IllegalArgumentException("I collari sono disponibili solo per cani o gatti");
        }
        if(tipoAttrezzatura ==TipoAttrezzatura.GUINZAGLI &&
                (tipoAnimale == TipoAnimale.UCCELLO || tipoAnimale == TipoAnimale.CONIGLIO)){
            throw new IllegalArgumentException("I guinzagli sono disponibili solo per cani o gatti");
        }
        if (tipoAttrezzatura == TipoAttrezzatura.LETTIERE &&
                (tipoAnimale == TipoAnimale.UCCELLO || tipoAnimale==TipoAnimale.CANE)) {
            throw new IllegalArgumentException("Le lettiere sono solo per gatti e conigli");
        }
        if(tipoAttrezzatura == TipoAttrezzatura.GABBIE&&(
                (tipoAnimale!=TipoAnimale.UCCELLO) && tipoAnimale!=TipoAnimale.CONIGLIO)){
            throw new IllegalArgumentException("Le gabbie sono solo uccelli e conigli");
        }
        if(tipoAttrezzatura== TipoAttrezzatura.KENNEL && tipoAnimale!= TipoAnimale.CANE){
            throw new IllegalArgumentException("I kennel sono solo per cani");
        }
        if (tipoAttrezzatura== TipoAttrezzatura.TRASPORTINI && (tipoAnimale!=TipoAnimale.CONIGLIO)&& tipoAnimale!=TipoAnimale.GATTO){
            throw new IllegalArgumentException("I trasportini sono solo per gatti e conigli");
        }


    }

    public Page<Attrezzatura> prendiAttrezzature(int page, int size){
        Pageable pageable= PageRequest.of(page,size, Sort.by("nome").descending());
        return attrezzaturaRepository.findAll(pageable);
    }

    public Attrezzatura prendiAttrezzatura(Long id) throws NotFoundException {
        return attrezzaturaRepository.findById(id).orElseThrow(()->new NotFoundException("Prodotto non trovata"));
    }

    public Attrezzatura salvaAttrezzatura(AttrezzaturaDto attrezzaturaDto, String imageUrl){
        validazioneAttrezzatura(attrezzaturaDto);
        Attrezzatura attrezzatura=new Attrezzatura();
        attrezzatura.setTipoAttrezzatura(TipoAttrezzatura.valueOf(attrezzaturaDto.getTipoAttrezzatura().toUpperCase()));
        attrezzatura.setNome(attrezzaturaDto.getNome());
        attrezzatura.setMarca(attrezzaturaDto.getMarca());
        attrezzatura.setPrezzo(attrezzaturaDto.getPrezzo());
        attrezzatura.setDescrizione(attrezzaturaDto.getDescrizione());
        attrezzatura.setTipoAnimale(TipoAnimale.valueOf(attrezzaturaDto.getTipoAnimale().toUpperCase()));
        attrezzatura.setImmagineUrl(imageUrl);
        attrezzatura.setTipoProdotto("ATTREZZATURA");
        return attrezzaturaRepository.save(attrezzatura);
    }

    public Attrezzatura modificaAttrezzatura(Long id,AttrezzaturaDto attrezzaturaDto) throws NotFoundException {
        validazioneAttrezzatura(attrezzaturaDto);
        Attrezzatura attrezzaturaDaModificare= prendiAttrezzatura(id);
        attrezzaturaDaModificare.setTipoAnimale(TipoAnimale.valueOf(attrezzaturaDto.getTipoAnimale().toUpperCase()));
        attrezzaturaDaModificare.setTipoAttrezzatura(TipoAttrezzatura.valueOf(attrezzaturaDto.getTipoAttrezzatura().toUpperCase()));
        attrezzaturaDaModificare.setNome(attrezzaturaDto.getNome());
        attrezzaturaDaModificare.setMarca(attrezzaturaDto.getMarca());
        attrezzaturaDaModificare.setPrezzo(attrezzaturaDto.getPrezzo());
        attrezzaturaDaModificare.setDescrizione(attrezzaturaDto.getDescrizione());
        attrezzaturaDaModificare.setTipoProdotto("ATTREZZATURA");
        return attrezzaturaRepository.save(attrezzaturaDaModificare);
    }

    public void eliminaAttrezzatura(Long id) throws NotFoundException {
        attrezzaturaRepository.delete(prendiAttrezzatura(id));
    }

    public Page<AttrezzaturaDto> cercaPerKeyword(String nome,Pageable pageable
    ){
        return attrezzaturaRepository.cercaPerKeyword(nome,pageable).map(attrezzatura -> convertiInDto(attrezzatura) );
    }

    public AttrezzaturaDto convertiInDto(Attrezzatura att) {
        AttrezzaturaDto attrezzaturaDto = new AttrezzaturaDto();
        attrezzaturaDto.setId(att.getId());
        attrezzaturaDto.setNome(att.getNome());
        attrezzaturaDto.setMarca(att.getMarca());
        attrezzaturaDto.setPrezzo(att.getPrezzo());
        attrezzaturaDto.setDescrizione(att.getDescrizione());
        attrezzaturaDto.setTipoAnimale(att.getTipoAnimale().toString());
        attrezzaturaDto.setTipoAttrezzatura(att.getTipoAttrezzatura().toString());
        attrezzaturaDto.setImmagineUrl(att.getImmagineUrl());
        attrezzaturaDto.setTipoProdotto("ATTREZZATURA");
        return attrezzaturaDto;
    }
}


