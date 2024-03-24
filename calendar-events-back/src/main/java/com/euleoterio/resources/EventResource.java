package com.euleoterio.resources;

import com.euleoterio.dtos.EventDTO;
import com.euleoterio.models.Event;
import com.euleoterio.services.EventService;

import javax.inject.Inject;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/events")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EventResource {

    @Inject
    EventService eventService;

    @GET
    public Response findEvents() {
        try {
            List<EventDTO> events = eventService.listAllOrdened();
            return Response.ok(events).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro ao buscar os eventos: " + e.getMessage()).build();
        }
    }

    @POST
    @Transactional
    public Response createEvent(Event event) {
        try {
            Event createdEvent = eventService.createEvent(event);
            return Response.status(Response.Status.CREATED).entity(createdEvent).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Erro ao criar o evento").build();
        }
    }

    @GET
    @Path("/{id}")
    public Response findEventById(@PathParam("id") Integer id) {
        try {
            EventDTO event = eventService.findEventById(id);
            return Response.ok(event).build();
        } catch (EntityNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Erro ao buscar o evento").build();
        }
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response updateEvent(@PathParam("id") Integer id, Event eventUpdate) {
        try {
            Event updatedEvent = eventService.updateEvent(id, eventUpdate);
            return Response.ok(updatedEvent).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        } catch (EntityNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Erro ao atualizar o evento").build();
        }
    }


    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteEvent(@PathParam("id") Integer id) {
        try {
            eventService.deleteEvent(id);
            return Response.ok("Evento deletado com sucesso").build();
        } catch (EntityNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Erro ao deletar o evento").build();
        }
    }
}
