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

    public ElementoCarrello salvaELemento( ElementoCarrelloDto elementoCarrelloDto) throws NotFoundException {
        ElementoCarrello elementoCarrello=new ElementoCarrello();
        Prodotto prodotto = prodottoRepository.findById(elementoCarrelloDto.getProdottoId())
                .orElseThrow(() -> new NotFoundException("Prodotto non trovato con id: " + elementoCarrelloDto.getProdottoId()));

        elementoCarrello.setProdotto(prodotto);
        elementoCarrello.setQuantita(elementoCarrelloDto.getQuantita());


        Carrello carrello = carrelloRepository.findById(elementoCarrelloDto.getCarrelloId())
                .orElseThrow(() -> new NotFoundException("Carrello non trovato con id: " + elementoCarrelloDto.getCarrelloId()));
        elementoCarrello.setCarrello(carrello);

        return elementoCarrello;
    }

   //avendo solo la quantità da modificare creo un metodo modificaQuantità al posto di modificaElemento

    public ElementoCarrello modificaQuantità(Long id, int nuovaQuantita) throws NotFoundException {
        ElementoCarrello elementoCarrello= prendiElemento(id);
        elementoCarrello.setQuantita(nuovaQuantita);
        return elementoCarrello;
    }

    public ElementoCarrello aggiungiAlCarrello(ElementoCarrelloDto elementoCarrelloDto) throws NotFoundException {
        Prodotto prodotto = prendiElemento(elementoCarrelloDto.getProdottoId()).getProdotto();

        Carrello carrello = prendiElemento(elementoCarrelloDto.getCarrelloId()).getCarrello();

        ElementoCarrello elemento = new ElementoCarrello();
        elemento.setProdotto(prodotto);
        elemento.setQuantita(elementoCarrelloDto.getQuantita());
        elemento.setCarrello(carrello);

        return elementoCarrelloRepository.save(elemento);
    }

    public void eliminaElemento(Long id) throws NotFoundException {
        elementoCarrelloRepository.delete(prendiElemento(id));
    }
}
