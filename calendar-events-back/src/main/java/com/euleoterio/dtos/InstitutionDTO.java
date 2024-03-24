package com.euleoterio.dtos;

import com.euleoterio.enums.InstitutionType;
import com.euleoterio.models.Institution;
import lombok.Data;

@Data
public class InstitutionDTO {

    public Integer id;
    public String name;
    public InstitutionType type;

    public static InstitutionDTO fromInstitution(Institution institution) {
        InstitutionDTO dto = new InstitutionDTO();
        dto.id = institution.id;
        dto.name = institution.name;
        dto.type = institution.type;
        return dto;
    }
}