package it.epicode.Back_end.dto;

import lombok.Data;

import java.util.List;

@Data
public class CarrelloDto {
    private Long id;
    private List<ElementoCarrelloDto> elementiCarrelloDto;
}
