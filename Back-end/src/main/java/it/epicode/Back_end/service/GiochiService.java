package it.epicode.Back_end.service;

import it.epicode.Back_end.dto.AttrezzaturaDto;
import it.epicode.Back_end.dto.GiochiDto;
import it.epicode.Back_end.enumerated.TipoAnimale;
import it.epicode.Back_end.enumerated.TipoAttrezzatura;
import it.epicode.Back_end.enumerated.TipoGiochi;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Attrezzatura;
import it.epicode.Back_end.model.Giochi;
import it.epicode.Back_end.repository.GiochiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GiochiService {

        @Autowired
        private GiochiRepository giochiRepository;

        private void validazioneGiochi(GiochiDto giochiDto) {
            TipoAnimale tipoAnimale;
            TipoGiochi tipoGiochi;
            try {
                tipoAnimale = TipoAnimale.valueOf(giochiDto.getTipoAnimale().toUpperCase());
                tipoGiochi = TipoGiochi.valueOf(giochiDto.getTipoGiochi().toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Animale o giochi inseriti non validiti");
            }
            if (tipoGiochi == TipoGiochi.BEVITOGLIO &&
                    (tipoAnimale != TipoAnimale.UCCELLO && tipoAnimale != TipoAnimale.CONIGLIO)) {
                throw new IllegalArgumentException("I bevitogli sono solo per uccelli e conigli");
            }
            if (tipoGiochi == TipoGiochi.CANNA || tipoGiochi == TipoGiochi.GOMITOLO || tipoGiochi == TipoGiochi.TOPOLINO &&
                    (tipoAnimale != TipoAnimale.GATTO)) {
                throw new IllegalArgumentException("Canne da pesca, gomitoli di lana e topolini sono solo per gatti");
            }
            if (tipoGiochi == TipoGiochi.PALLINA || tipoGiochi == TipoGiochi.CORDA &&
                    (tipoAnimale != TipoAnimale.CANE)) {
                throw new IllegalArgumentException("Le palline e le corde sono solo per i cani");
            }
            if (tipoGiochi == TipoGiochi.KONG &&
                    (tipoAnimale != TipoAnimale.CANE && tipoAnimale != TipoAnimale.CONIGLIO)) {
                throw new IllegalArgumentException("Il Kong è solo per cani e conigli");
            }
            if ((tipoGiochi == TipoGiochi.TUNNEL || tipoGiochi == TipoGiochi.BEVITOGLIO || tipoGiochi == TipoGiochi.CASETTE || tipoGiochi == TipoGiochi.RAMPE) && (tipoAnimale != TipoAnimale.CONIGLIO)) {
                throw new IllegalArgumentException("Tunnel rampe casette e bevitogli sono solo per conigli");
            }
        }

        public Page<Giochi> prendiGiochi(int page, int size){
            Pageable pageable= PageRequest.of(page,size, Sort.by("nome").descending());
            return giochiRepository.findAll(pageable);
        }

        public Giochi prendiGioco(Long id) throws NotFoundException {
            return giochiRepository.findById(id).orElseThrow(()->new NotFoundException("Prodotto non trovata"));
        }

        public Giochi salvaGiochi(GiochiDto giochiDto, String imageUrl){
            validazioneGiochi(giochiDto);
            Giochi giochi=new Giochi();
            giochi.setTipoGioco(TipoGiochi.valueOf(giochiDto.getTipoGiochi().toUpperCase()));
            giochi.setNome(giochiDto.getNome());
            giochi.setMarca(giochiDto.getMarca());
            giochi.setPrezzo(giochiDto.getPrezzo());
            giochi.setDescrizione(giochiDto.getDescrizione());
            giochi.setTipoAnimale(TipoAnimale.valueOf(giochiDto.getTipoAnimale().toUpperCase()));
            giochi.setImmagineUrl(imageUrl);
            giochi.setTipoProdotto("giochi");
            return giochiRepository.save(giochi);
        }

        public Giochi modificaGiochi(Long id,GiochiDto giochiDto) throws NotFoundException {
            validazioneGiochi(giochiDto);
            Giochi giocoDaModificare= prendiGioco(id);
            giocoDaModificare.setTipoAnimale(TipoAnimale.valueOf(giochiDto.getTipoAnimale().toUpperCase()));
            giocoDaModificare.setTipoGioco(TipoGiochi.valueOf(giochiDto.getTipoGiochi().toUpperCase()));
            giocoDaModificare.setNome(giochiDto.getNome());
            giocoDaModificare.setMarca(giochiDto.getMarca());
            giocoDaModificare.setPrezzo(giochiDto.getPrezzo());
            giocoDaModificare.setDescrizione(giochiDto.getDescrizione());
            return giochiRepository.save(giocoDaModificare);
        }

        public void eliminaGioco(Long id) throws NotFoundException {
            giochiRepository.delete(prendiGioco(id));
        }

        public Page<GiochiDto> cercaPerKeyword(String keyWord,int pagine, int size){
            Pageable pageable= PageRequest.of(pagine,size, Sort.by("prezzo").ascending());
            return giochiRepository.cercaPerKeyword(keyWord,pageable).map(giochi-> convertiInDto(giochi) );
        }

        public GiochiDto convertiInDto(Giochi gio) {
            GiochiDto giochiDto=new GiochiDto();
            giochiDto.setId(gio.getId());
            giochiDto.setNome(gio.getNome());
            giochiDto.setMarca(gio.getMarca());
            giochiDto.setPrezzo(gio.getPrezzo());
            giochiDto.setDescrizione(gio.getDescrizione());
            giochiDto.setTipoAnimale(gio.getTipoAnimale().toString());
            giochiDto.setTipoAttrezzatura(gio.getTipoGioco().toString());
            giochiDto.setImmagineUrl(gio.getImmagineUrl());
            giochiDto.setTipoProdotto("gioco");
            return giochiDto;
        }
}
