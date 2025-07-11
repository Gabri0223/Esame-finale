package it.epicode.Back_end.service;

import it.epicode.Back_end.dto.AttrezzaturaDto;
import it.epicode.Back_end.enumerated.TipoAnimale;
import it.epicode.Back_end.enumerated.TipoAttrezzatura;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Attrezzatura;
import it.epicode.Back_end.repository.AttrezzaturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
        if ( tipoAnimale !=TipoAnimale.GATTO && tipoAttrezzatura ==TipoAttrezzatura.LETTIERE){
            throw new IllegalArgumentException("Le lettiere sono disponibili solo per i gatti");
        }
        if(tipoAnimale !=TipoAnimale.PESCE && tipoAttrezzatura==TipoAttrezzatura.ACQUARIOLOGIA){
            throw new IllegalArgumentException("L'acquariologia è disponibile solo per i pesci");
        }
        if(tipoAttrezzatura == TipoAttrezzatura.COLLARI&&
                (tipoAnimale == TipoAnimale.UCCELLO || tipoAnimale == TipoAnimale.CONIGLIO || tipoAnimale == TipoAnimale.TARTARUGA ||tipoAnimale == TipoAnimale.PESCE)){
            throw new IllegalArgumentException("I collari sono disponibili solo per cani o gatti");
        }
        if (tipoAttrezzatura == TipoAttrezzatura.IGIENE &&
                (tipoAnimale == TipoAnimale.UCCELLO || tipoAnimale == TipoAnimale.TARTARUGA || tipoAnimale== TipoAnimale.PESCE)) {
            throw new IllegalArgumentException("Prodotti di igiene non sono disponibili per uccelli o tartarughe");
        }
        if (tipoAttrezzatura == TipoAttrezzatura.GIOCHI &&
                (tipoAnimale == TipoAnimale.UCCELLO || tipoAnimale == TipoAnimale.TARTARUGA || tipoAnimale==TipoAnimale.PESCE)) {
            throw new IllegalArgumentException("I giochi sono disponibili solo per cani, gatti e conigli");
        }

    }

    public List<Attrezzatura> prendiAttrezzature(){
        return attrezzaturaRepository.findAll();
    }

    public Attrezzatura prendiAttrezzatura(Long id) throws NotFoundException {
        return attrezzaturaRepository.findById(id).orElseThrow(()->new NotFoundException("Prodotto non trovata"));
    }

    public Attrezzatura salvaAttrezzatura(AttrezzaturaDto attrezzaturaDto){
        validazioneAttrezzatura(attrezzaturaDto);
        Attrezzatura attrezzatura=new Attrezzatura();
        attrezzatura.setTipoAttrezzatura(TipoAttrezzatura.valueOf(attrezzaturaDto.getTipoAttrezzatura().toUpperCase()));
        attrezzatura.setNome(attrezzaturaDto.getNome());
        attrezzatura.setMarca(attrezzaturaDto.getMarca());
        attrezzatura.setPrezzo(attrezzaturaDto.getPrezzo());
        attrezzatura.setDescrizione(attrezzaturaDto.getDescrizione());
        attrezzatura.setTipoAnimale(TipoAnimale.valueOf(attrezzaturaDto.getTipoAnimale().toUpperCase()));
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
        return attrezzaturaRepository.save(attrezzaturaDaModificare);
    }

    public void eliminaAttrezzatura(Long id) throws NotFoundException {
        attrezzaturaRepository.delete(prendiAttrezzatura(id));
    }
}

