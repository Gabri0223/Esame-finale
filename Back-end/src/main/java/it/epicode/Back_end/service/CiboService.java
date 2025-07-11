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
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CiboService {

    @Autowired
    private CiboRepository ciboRepository;

    public List<Cibo> prendiCibi() {
        return ciboRepository.findAll();
    }

    public Cibo prendiCIbo(Long id) throws NotFoundException {
        return ciboRepository.findById(id).orElseThrow(() -> new NotFoundException("Cibo non trovati"));
    }


    public Cibo salvaCibo(CiboDto ciboDto) {

        Cibo cibo = new Cibo();
        cibo.setNome(ciboDto.getNome());
        cibo.setPrezzo(ciboDto.getPrezzo());
        cibo.setMarca(cibo.getMarca());

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
        }
            return ciboRepository.save(ciboDaModificare);

    }

    public void eliminaCibo(Long id) throws NotFoundException {
        ciboRepository.delete(prendiCIbo(id));
    }
}
