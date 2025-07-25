package it.epicode.Back_end.service;

import it.epicode.Back_end.dto.CodiceScontoDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.CodiceSconto;
import it.epicode.Back_end.repository.CodiceScontoRepository;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CodiceScontoService {

    @Autowired
    private CodiceScontoRepository codiceScontoRepository;

    public List<CodiceSconto> prendiCodiciSconto(){
        return codiceScontoRepository.findAll();
    }

    public CodiceSconto prendiCodiceSconto(Long id) throws NotFoundException {
        return codiceScontoRepository.findById(id).orElseThrow(()->new NotFoundException("Codice sconto non trovato"));
    }

    public CodiceSconto creaCodiceSconto( CodiceScontoDto codiceScontoDto){
        CodiceSconto codiceSconto=new CodiceSconto();
        String codice = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        codiceSconto.setCodiceSconto(codice);
        codiceSconto.setPercentuale(codiceScontoDto.getPercentuale());
        codiceSconto.setNome(codiceScontoDto.getNome());
        codiceSconto.setAttivo(true);
        return codiceScontoRepository.save(codiceSconto);
    }

    public CodiceSconto modificaCodiceSconto(Long id, CodiceScontoDto codiceScontoDto) throws NotFoundException {
        CodiceSconto codiceScontoDaModificare=prendiCodiceSconto(id);
        codiceScontoDaModificare.setNome(codiceScontoDto.getNome());
        codiceScontoDaModificare.setPercentuale(codiceScontoDto.getPercentuale());
        return codiceScontoRepository.save(codiceScontoDaModificare);
    }

    public CodiceSconto verificaCodiceSconto(String codiceSconto){

        CodiceSconto codice= codiceScontoRepository.findByCodiceSconto(codiceSconto).orElseThrow(()->new ValidationException("Codice sconto non valido"));

        if(!codice.isAttivo()){
            throw new ValidationException("Il coupon non è attivo");
        }
        codice.setAttivo(false);
        codiceScontoRepository.save(codice);
        return codice;
    }

    public void eliminaCodiceSconto(Long id) throws NotFoundException {
        codiceScontoRepository.delete(prendiCodiceSconto(id));
    }
}
