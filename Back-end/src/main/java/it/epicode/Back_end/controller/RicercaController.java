package it.epicode.Back_end.controller;

import it.epicode.Back_end.dto.AttrezzaturaDto;
import it.epicode.Back_end.dto.CiboDto;
import it.epicode.Back_end.dto.GiochiDto;
import it.epicode.Back_end.dto.ProdottoCompressoDto;
import it.epicode.Back_end.service.AttrezzaturaService;
import it.epicode.Back_end.service.CiboService;
import it.epicode.Back_end.service.GiochiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/ricerca")
public class RicercaController {

    @Autowired
    CiboService ciboService;

    @Autowired
    private AttrezzaturaService attrezzaturaService;

    @Autowired
    private GiochiService giochiService;

    @GetMapping
    public List<ProdottoCompressoDto> cercaProdotti(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size,
    @RequestParam(defaultValue = "rilevanza") String sort)
    {
        Sort sorting = switch (sort) {
            case "prezzo_asc" -> Sort.by("prezzo").ascending();
            case "prezzo_desc" -> Sort.by("prezzo").descending();
            case "nome_asc" -> Sort.by("nome").ascending();
            case "nome_desc"->Sort.by("nome").descending();
            default -> Sort.unsorted();
        };

        PageRequest pageRequest = PageRequest.of(0, 1000, sorting);
        Page<CiboDto> cibi = ciboService.cercaPerKeyword(keyword, pageRequest);
        Page<AttrezzaturaDto> attrezzature = attrezzaturaService.cercaPerKeyword(keyword, pageRequest);
        Page<GiochiDto> giochi = giochiService.cercaPerKeyword(keyword, pageRequest);

        List<ProdottoCompressoDto> risultati = new ArrayList<>();
        cibi.forEach(cibo -> risultati.add(new ProdottoCompressoDto("Cibo", cibo, cibo.getNome(),cibo.getPrezzo())));
        attrezzature.forEach(attrezzatura -> risultati.add(new ProdottoCompressoDto("Attrezzatura",attrezzatura,attrezzatura.getNome(),attrezzatura.getPrezzo())));
        giochi.forEach(gioco -> risultati.add(new ProdottoCompressoDto("Gioco", gioco, gioco.getNome(), gioco.getPrezzo())));

        switch (sort) {
            case "prezzo_asc" -> risultati.sort((a, b) -> Double.compare(a.getPrezzo(), b.getPrezzo()));
            case "prezzo_desc" -> risultati.sort((a, b) -> Double.compare(b.getPrezzo(), a.getPrezzo()));
            case "nome_asc" -> risultati.sort((a, b) -> a.getNome().compareToIgnoreCase(b.getNome()));
            case "nome_desc" -> risultati.sort((a, b) -> b.getNome().compareToIgnoreCase(a.getNome()));
            default -> {}
        }

        int totaleElementi=risultati.size();
        int totalePagine= totaleElementi/size;
        int fromIndex = page * size;
        int toIndex = Math.min(fromIndex + size, risultati.size());

        List<ProdottoCompressoDto> risultatiPaginati = new ArrayList<>();

        for (int i = fromIndex; i < toIndex; i++) {risultatiPaginati.add(risultati.get(i));
        }
        return risultatiPaginati;
    }
}
