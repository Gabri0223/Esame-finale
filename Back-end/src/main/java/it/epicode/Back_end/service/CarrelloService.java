package it.epicode.Back_end.service;

import it.epicode.Back_end.dto.CarrelloDto;
import it.epicode.Back_end.dto.ElementoCarrelloDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Carrello;
import it.epicode.Back_end.model.ElementoCarrello;
import it.epicode.Back_end.repository.CarrelloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CarrelloService {

    @Autowired
    private CarrelloRepository carrelloRepository;
    @Autowired
    private ElementoCarrelloService elementoCarrelloService;

    public List<Carrello> prendiCarrelli(){
        return carrelloRepository.findAll();
    }

    public Carrello prendiCarrello(Long id) throws NotFoundException {
        return carrelloRepository.findById(id).orElseThrow(()->new NotFoundException("Carrello non trovato"));
    }

    public Carrello salvaCarrello(CarrelloDto carrelloDto) throws NotFoundException {
        Carrello carrello = new Carrello();

        List<ElementoCarrello> elementi = new ArrayList<>();
        for(ElementoCarrelloDto dto : carrelloDto.getElementiCarrelloDto()) {
            ElementoCarrello elemento = elementoCarrelloService.salvaELemento(dto);
            elemento.setCarrello(carrello);
            elementi.add(elemento);
        }
        carrello.setElementiCarrello(elementi);

        return carrelloRepository.save(carrello);
    }

    public void eliminaCarrello(Long id) throws NotFoundException {
        carrelloRepository.delete(prendiCarrello(id));
    }
}
