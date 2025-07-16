package it.epicode.Back_end.service;

import it.epicode.Back_end.dto.CiboDto;
import it.epicode.Back_end.enumerated.EtaAnimale;
import it.epicode.Back_end.enumerated.TagliaAnimale;
import it.epicode.Back_end.enumerated.TipoAnimale;
import it.epicode.Back_end.enumerated.TipoCibo;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Cibo;
import it.epicode.Back_end.repository.CiboRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CiboService {

    @Autowired
    private CiboRepository ciboRepository;

    public Page<Cibo> prendiCibi(int page,int size) {
        Pageable pageable=PageRequest.of(page,size,Sort.by("nome").ascending());
        return ciboRepository.findAll(pageable);
    }

    public Cibo prendiCIbo(Long id) throws NotFoundException {
        return ciboRepository.findById(id).orElseThrow(() -> new NotFoundException("Cibo non trovati"));
    }


    public Cibo salvaCibo(CiboDto ciboDto,String imageUrl) {

        Cibo cibo = new Cibo();
        cibo.setNome(ciboDto.getNome());
        cibo.setPrezzo(ciboDto.getPrezzo());
        cibo.setMarca(ciboDto.getMarca());
        cibo.setDescrizione(ciboDto.getDescrizione());
        cibo.setImmagineUrl(imageUrl);
        cibo.setTipoProdotto("cibo");
        try {
            cibo.setTipoAnimale(TipoAnimale.valueOf(ciboDto.getTipoAnimale().toUpperCase()));
        }catch (IllegalArgumentException | NullPointerException e){
            throw new IllegalArgumentException("Hai inserito un tipo di animale non valido");
        }
        if (ciboDto.getTipoAnimale().equals("CANE")||ciboDto.getTipoAnimale().equals("GATTO")){
            if (ciboDto.getTipoCibo() == null || ciboDto.getTagliaAnimale() == null || ciboDto.getEtaAnimale() == null){
                throw new IllegalArgumentException("Per cani e gatti devi specificare taglia età e tipo di cibo");
            }else{
                try {
                    cibo.setTipoCibo(TipoCibo.valueOf(ciboDto.getTipoCibo().toUpperCase()));
                    cibo.setEtaAnimale(EtaAnimale.valueOf(ciboDto.getEtaAnimale().toUpperCase()));
                    cibo.setTagliaAnimale(TagliaAnimale.valueOf(ciboDto.getTagliaAnimale().toUpperCase()));
                }catch (IllegalArgumentException e){
                    throw new IllegalArgumentException("Hai inserito un tipo di cibo, età o taglia sbagliata/o");
                }
            }
        }else{
            cibo.setTipoCibo(null);
            cibo.setEtaAnimale(null);
            cibo.setTagliaAnimale(null);
        }

        return ciboRepository.save(cibo);
    }

    public Cibo modificaCibo(Long id, CiboDto ciboDto) throws NotFoundException {
        Cibo ciboDaModificare = prendiCIbo(id);

        ciboDaModificare.setNome(ciboDto.getNome());
        ciboDaModificare.setPrezzo(ciboDto.getPrezzo());
        ciboDaModificare.setMarca(ciboDto.getMarca());
        ciboDaModificare.setDescrizione(ciboDto.getDescrizione());
        ciboDaModificare.setImmagineUrl(ciboDto.getImmagineUrl());
        ciboDaModificare.setTipoProdotto("cibo");
        try {
            ciboDaModificare.setTipoAnimale(TipoAnimale.valueOf(ciboDto.getTipoAnimale().toUpperCase()));
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new IllegalArgumentException(("Hai inserito un tipo di animale non valido"));
        }
        if (ciboDto.getTipoAnimale().equals("CANE") || ciboDto.getTipoAnimale().equals("GATTO")) {
            if (ciboDto.getTipoCibo() == null || ciboDto.getTagliaAnimale() == null || ciboDto.getEtaAnimale() == null) {
                throw new IllegalArgumentException("Per cani e gatti devi specificare taglia età e tipo di cibo");
            } else {
                try {
                    ciboDaModificare.setTipoCibo(TipoCibo.valueOf(ciboDto.getTipoCibo().toUpperCase()));
                    ciboDaModificare.setEtaAnimale(EtaAnimale.valueOf(ciboDto.getEtaAnimale().toUpperCase()));
                    ciboDaModificare.setTagliaAnimale(TagliaAnimale.valueOf(ciboDto.getTagliaAnimale().toUpperCase()));
                } catch (IllegalArgumentException e) {
                    throw new IllegalArgumentException("Hai inserito un tipo di cibo, età o taglia sbagliata/o");
                }
            }
        }else{
            ciboDaModificare.setTipoCibo(null);
            ciboDaModificare.setEtaAnimale(null);
            ciboDaModificare.setTagliaAnimale(null);
            ciboDaModificare.setTipoProdotto("cibo");
        }
            return ciboRepository.save(ciboDaModificare);

    }

    public void eliminaCibo(Long id) throws NotFoundException {
        ciboRepository.delete(prendiCIbo(id));
    }

    public Page<CiboDto>cercaPerKeyword(String keyWord, int page, int size){
        Pageable pageable= PageRequest.of(page,size, Sort.by("prezzo").ascending());
        return ciboRepository.findByKeyWord(keyWord,pageable).map(cibo->convertiInDto(cibo));
    }

    public CiboDto convertiInDto(Cibo cibo) {
        CiboDto cibodto = new CiboDto();

        cibodto.setId(cibo.getId());
        cibodto.setNome(cibo.getNome());
        cibodto.setMarca(cibo.getMarca());
        cibodto.setPrezzo(cibo.getPrezzo());
        cibodto.setDescrizione(cibo.getDescrizione());
        cibodto.setTipoAnimale(cibo.getTipoAnimale().toString());
        cibodto.setTipoCibo(cibo.getTipoCibo().toString());
        cibodto.setEtaAnimale(cibo.getEtaAnimale().toString());
        cibodto.setTagliaAnimale(cibo.getTagliaAnimale().toString());
        cibodto.setImmagineUrl(cibo.getImmagineUrl());
        cibodto.setTipoProdotto("cibo");
        return cibodto;
    }


}
