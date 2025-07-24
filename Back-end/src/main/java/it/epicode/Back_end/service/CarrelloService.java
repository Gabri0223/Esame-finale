package it.epicode.Back_end.service;

import it.epicode.Back_end.dto.CarrelloDto;
import it.epicode.Back_end.dto.ElementoCarrelloDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Carrello;
import it.epicode.Back_end.model.ElementoCarrello;
import it.epicode.Back_end.model.Utente;
import it.epicode.Back_end.repository.CarrelloRepository;
import it.epicode.Back_end.security.JwtTool;
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
    @Autowired
    private JwtTool jwtTool;


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
            ElementoCarrello elemento = elementoCarrelloService.salvaELemento(dto,carrello);
            elemento.setCarrello(carrello);
            elementi.add(elemento);
        }
        carrello.setElementiCarrello(elementi);

        return carrelloRepository.save(carrello);
    }

    public Carrello prendiCarrelloDaUtente(String token) throws NotFoundException {
        return carrelloRepository.findByUtente(jwtTool.UtentedaToken(token)).orElseThrow(()->new NotFoundException("carrello associato ad utente non trovato"));
    }

    public Carrello creaDaDto(CarrelloDto carrelloDto, Utente utente) throws NotFoundException {
        Carrello carrello = new Carrello();
        carrello.setUtente(utente);

        List<ElementoCarrello> elementi = new ArrayList<>();
        for (ElementoCarrelloDto dto : carrelloDto.getElementiCarrelloDto()) {
            ElementoCarrello elemento = elementoCarrelloService.salvaELemento(dto,carrello);
            elemento.setCarrello(carrello);
            elementi.add(elemento);
        }

        carrello.setElementiCarrello(elementi);
        return carrelloRepository.save(carrello);
    }

    public void unisciCarrelli(Carrello carrelloBackEnd, CarrelloDto carrelloDto) throws NotFoundException {

        List<ElementoCarrello> elementiBackEnd = carrelloBackEnd.getElementiCarrello();
        if (elementiBackEnd == null) {
            elementiBackEnd = new ArrayList<>();
            carrelloBackEnd.setElementiCarrello(elementiBackEnd);
        }
        for (ElementoCarrelloDto elementoCarrelloDto : carrelloDto.getElementiCarrelloDto()) {
            boolean trovato = false;
            for (ElementoCarrello elementoCarrello : elementiBackEnd) {
                if (elementoCarrello.getProdotto().getId().equals(elementoCarrelloDto.getProdottoId())) {
                    elementoCarrello.setQuantita(elementoCarrello.getQuantita() + elementoCarrelloDto.getQuantita());
                    trovato = true;
                    break;
                }
            }
            if (!trovato) {

                ElementoCarrello nuovoElemento = elementoCarrelloService.salvaELemento(elementoCarrelloDto,carrelloBackEnd);
                nuovoElemento.setCarrello(carrelloBackEnd);
                elementiBackEnd.add(nuovoElemento);
            }
        }
        carrelloRepository.save(carrelloBackEnd);
    }

    public void eliminaElementi(Long id) throws NotFoundException {
        for(ElementoCarrello elementoCarrello: prendiCarrello(id).getElementiCarrello()) {
            elementoCarrelloService.eliminaElemento(elementoCarrello.getId());
        }
    }
}
