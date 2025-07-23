package it.epicode.Back_end.service;

import it.epicode.Back_end.controller.DettagliController;
import it.epicode.Back_end.dto.ElementoCarrelloDto;
import it.epicode.Back_end.exception.NotFoundException;
import it.epicode.Back_end.model.Carrello;
import it.epicode.Back_end.model.ElementoCarrello;
import it.epicode.Back_end.model.Prodotto;
import it.epicode.Back_end.repository.CarrelloRepository;
import it.epicode.Back_end.repository.ElementoCarrelloRepository;
import it.epicode.Back_end.repository.ProdottoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ElementoCarrelloService {

    @Autowired
    private ElementoCarrelloRepository elementoCarrelloRepository;
    @Autowired
    private ProdottoRepository prodottoRepository;
    @Autowired
    private CarrelloRepository carrelloRepository;

    public List<ElementoCarrello> prendiElementi(){
        return elementoCarrelloRepository.findAll();
    }

    public ElementoCarrello prendiElemento(Long id) throws NotFoundException {
        return elementoCarrelloRepository.findById(id).orElseThrow(()-> new NotFoundException("Elemento non trovato"));
    }

    public ElementoCarrello salvaELemento( ElementoCarrelloDto elementoCarrelloDto, Carrello carrello) throws NotFoundException {
        ElementoCarrello elementoCarrello=new ElementoCarrello();
        Prodotto prodotto = prodottoRepository.findById(elementoCarrelloDto.getProdottoId())
                .orElseThrow(() -> new NotFoundException("Prodotto non trovato con id: " + elementoCarrelloDto.getProdottoId()));

        String taglia = elementoCarrelloDto.getTaglia();
        double prezzoBase= prodotto.getPrezzo();
        if (taglia != null) {
            switch (taglia) {
                case "XS":
                    prezzoBase -= 5.0;
                    break;
                case "S":
                    prezzoBase -= 2.0;
                    break;
                case "M":
                    break;
                case "L":
                    prezzoBase += 2.0;
                    break;
                case "XL":
                    prezzoBase += 5.0;
                    break;
            }
        }
        elementoCarrello.setProdotto(prodotto);
        elementoCarrello.setQuantita(elementoCarrelloDto.getQuantita());
        elementoCarrello.setPrezzoTotale(prezzoBase*elementoCarrello.getQuantita());
        elementoCarrello.setTaglia(taglia);
        elementoCarrello.setCarrello(carrello);

        return elementoCarrelloRepository.save(elementoCarrello);
    }

   //avendo solo la quantità da modificare creo un metodo modificaQuantità al posto di modificaElemento

    public ElementoCarrello modificaQuantità(Long id, int nuovaQuantita) throws NotFoundException {
        ElementoCarrello elementoCarrello= prendiElemento(id);
        double prezzoTotalePrec=elementoCarrello.getPrezzoTotale()/elementoCarrello.getQuantita();
        elementoCarrello.setQuantita(nuovaQuantita);
        elementoCarrello.setPrezzoTotale(prezzoTotalePrec*nuovaQuantita);
        return elementoCarrello;
    }



    public void eliminaElemento(Long id) throws NotFoundException {
        elementoCarrelloRepository.delete(prendiElemento(id));
    }
}
