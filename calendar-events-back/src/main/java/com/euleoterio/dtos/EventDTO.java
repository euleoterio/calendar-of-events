package com.euleoterio.dtos;

import com.euleoterio.models.Event;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EventDTO {

    public Integer id;
    public String title;
    public String description;
    public LocalDate startsDate;
    public LocalDate endsDate;
    public boolean status;
    public InstitutionDTO institution;

    public static EventDTO fromEvent(Event event) {
        EventDTO dto = new EventDTO();
        dto.id = event.id;
        dto.title = event.title;
        dto.description = event.description;
        dto.startsDate = event.startsDate;
        dto.endsDate = event.endsDate;
        dto.status = event.status;
        dto.institution = InstitutionDTO.fromInstitution(event.institution);
        return dto;
    }
}