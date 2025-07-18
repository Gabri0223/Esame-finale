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
            throw new IllegalArgumentException("Animale o attrezzatura inseriti non validiti");
        }
        if((tipoAnimale !=TipoAnimale.PESCE && tipoAnimale !=TipoAnimale.TARTARUGA) && tipoAttrezzatura==TipoAttrezzatura.ACQUARIOLOGIA){
            throw new IllegalArgumentException("L'acquariologia è disponibile solo per pesci e tartarughe");
        }
        if(tipoAttrezzatura == TipoAttrezzatura.COLLARI&&
                (tipoAnimale == TipoAnimale.UCCELLO || tipoAnimale == TipoAnimale.CONIGLIO || tipoAnimale == TipoAnimale.TARTARUGA ||tipoAnimale == TipoAnimale.PESCE)){
            throw new IllegalArgumentException("I collari sono disponibili solo per cani o gatti");
        }
        if (tipoAttrezzatura == TipoAttrezzatura.LETTIERE &&
                (tipoAnimale == TipoAnimale.UCCELLO || tipoAnimale == TipoAnimale.TARTARUGA || tipoAnimale== TipoAnimale.PESCE)) {
            throw new IllegalArgumentException("Prodotti di igiene non sono disponibili per uccelli o tartarughe");
        }
        if (tipoAttrezzatura == TipoAttrezzatura.GIOCHI &&
                (tipoAnimale == TipoAnimale.UCCELLO || tipoAnimale == TipoAnimale.TARTARUGA || tipoAnimale==TipoAnimale.PESCE)) {
            throw new IllegalArgumentException("I giochi sono disponibili solo per cani, gatti e conigli");
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
        attrezzatura.setTipoProdotto("attrezzatura");
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
        attrezzaturaDaModificare.setTipoProdotto("attrezzatura");
        return attrezzaturaRepository.save(attrezzaturaDaModificare);
    }

    public void eliminaAttrezzatura(Long id) throws NotFoundException {
        attrezzaturaRepository.delete(prendiAttrezzatura(id));
    }

    public Page<AttrezzaturaDto> cercaPerKeyword(String nome,int pagine, int size){
        Pageable pageable= PageRequest.of(pagine,size, Sort.by("prezzo").ascending());
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
        attrezzaturaDto.setTipoProdotto("attrezzatura");
        return attrezzaturaDto;
    }
}


