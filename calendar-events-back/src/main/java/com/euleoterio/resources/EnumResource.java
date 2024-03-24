package com.euleoterio.resources;

import com.euleoterio.services.InstitutionService;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/enums/institutionType")
public class EnumResource {

    @Inject
    InstitutionService institutionService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInstitutionTypes() {
        try {
            List<String> institutionTypes = institutionService.getAllInstitutionTypes();
            return Response.ok(institutionTypes).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro ao recuperar os tipos de instituição: " + e.getMessage())
                    .build();
        }
    }
}
