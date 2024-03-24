package com.euleoterio.resources;

import com.euleoterio.dtos.InstitutionDTO;
import com.euleoterio.models.Institution;
import com.euleoterio.services.InstitutionService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;

@Path("/institutions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class InstitutionResource {

    @Inject
    InstitutionService institutionService;

    @GET
    public Response getAllInstitutions() {
        try {
            List<Institution> institutions = institutionService.findAllInstitutions();
            List<InstitutionDTO> institutionDTOs = institutions.stream()
                    .map(InstitutionDTO::fromInstitution)
                    .collect(Collectors.toList());
            return Response.ok(institutionDTOs).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro ao recuperar as instituições: " + e.getMessage())
                    .build();
        }
    }

    @GET
    @Path("/{id}")
    public Response getInstitutionById(@PathParam("id") Integer id) {
        try {
            Institution institution = institutionService.findInstitutionById(id);
            if (institution == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Instituição não encontrada com o ID: " + id)
                        .build();
            }
            InstitutionDTO institutionDTO = InstitutionDTO.fromInstitution(institution);
            return Response.ok(institutionDTO).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro ao recuperar a instituição com o ID " + id + ": " + e.getMessage())
                    .build();
        }
    }

    @POST
    public Response createInstitution(Institution institution) {
        try {
            Institution createdInstitution = institutionService.createInstitution(institution);
            InstitutionDTO institutionDTO = InstitutionDTO.fromInstitution(createdInstitution);
            return Response.status(Response.Status.CREATED).entity(institutionDTO).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro ao criar a instituição: " + e.getMessage())
                    .build();
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateInstitution(@PathParam("id") Integer id, Institution institution) {
        try {
            Institution updatedInstitution = institutionService.updateInstitution(id, institution);
            if (updatedInstitution == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Instituição não encontrada com o ID: " + id)
                        .build();
            }
            return Response.status(Response.Status.OK)
                    .entity("Instituição atualizada com sucesso")
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro ao atualizar a instituição com o ID " + id)
                    .build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteInstitution(@PathParam("id") Integer id) {
        try {
            institutionService.deleteInstitution(id);
            return Response.status(Response.Status.NO_CONTENT)
                    .entity("Instituição excluída com sucesso")
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(e.getMessage())
                    .build();
        }
    }
}