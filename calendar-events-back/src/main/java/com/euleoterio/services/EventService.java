package com.euleoterio.services;

import com.euleoterio.dtos.EventDTO;
import com.euleoterio.models.Event;
import com.euleoterio.repositories.EventRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class EventService {

    @Inject
    EventRepository eventRepository;

    public List<EventDTO> listAllOrdened() {
        List<Event> events = eventRepository.listAllOrderedByStartDate();
        return events.stream().map(EventDTO::fromEvent).collect(Collectors.toList());
    }

    public List<Event> listAll() {
        return eventRepository.listAll();
    }

    @Transactional
    public Event createEvent(@NotNull @Valid Event event) {
        validateEventDates(event.startsDate, event.endsDate);
        event.status = setEventStatus(event);
        event.persist();
        return event;
    }

    public EventDTO findEventById(Integer id) {
        Event event = eventRepository.findById(id);
        if (event == null) {
            throw new EntityNotFoundException("Evento não encontrado com o ID: " + id);
        }
        return EventDTO.fromEvent(event);
    }

    @Transactional
    public Event updateEvent(@NotNull Integer id, @NotNull @Valid Event eventUpdate) {
        Event event = eventRepository.findById(id);
        if (event == null) {
            throw new EntityNotFoundException("Evento não encontrado com o ID: " + id);
        }

        event.title = eventUpdate.title;
        event.description = eventUpdate.description;
        event.startsDate = eventUpdate.startsDate;
        event.endsDate = eventUpdate.endsDate;
        event.institution = eventUpdate.institution;
        event.status = setEventStatus(eventUpdate);
        event.persist();
        return event;
    }

    @Transactional
    public void deleteEvent(@NotNull Integer id) {
        Event event = eventRepository.findById(id);
        if (event != null) {
            event.delete();
        } else {
            throw new EntityNotFoundException("Evento não encontrado com o ID: " + id);
        }
    }

    void validateEventDates(LocalDate startDate, LocalDate endDate) {
        LocalDate currentDate = LocalDate.now();
        if (endDate.isBefore(startDate)) {
            throw new IllegalArgumentException("Data final não pode ser anterior à data inicial");
        }
        if (endDate.isBefore(currentDate)) {
            throw new IllegalArgumentException("A data final do evento não pode ser no passado.");
        }
    }

    boolean setEventStatus(Event event) {
        LocalDate today = LocalDate.now();
        return (event.startsDate.isBefore(today) || event.startsDate.isEqual(today)) && event.endsDate.isAfter(today) || event.endsDate.isEqual(today);
    }
}
