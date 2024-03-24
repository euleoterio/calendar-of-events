package com.euleoterio.services;

import com.euleoterio.enums.InstitutionType;
import com.euleoterio.models.Event;
import com.euleoterio.models.Institution;
import com.euleoterio.repositories.EventRepository;
import com.euleoterio.repositories.InstitutionRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class InstitutionService {

    @Inject
    InstitutionRepository institutionRepository;
    @Inject
    EventRepository eventRepository;

    public List<Institution> findAllInstitutions() {
        return institutionRepository.listAll();
    }

    public Institution findInstitutionById(Integer id) {
        return institutionRepository.findById(id);
    }

    @Transactional
    public Institution createInstitution(Institution institution) {
        try {
            institution.persist();
            return institution;
        } catch (Exception e) {
            throw new RuntimeException("Falha ao criar instituição: " + e.getMessage());
        }
    }

    @Transactional
    public Institution updateInstitution(Integer id, Institution institutionUpdate) {
        try {
            Institution institution = institutionRepository.findById(id);
            institution.events.size();

            if (institution != null) {
                institution.name = institutionUpdate.name;
                institution.type = institutionUpdate.type;
                institution.persist();
                return institution;
            } else {
                throw new RuntimeException("Instituição não encontrada com o ID: " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Falha ao atualizar a instituição com o ID " + id + ": " + e.getMessage());
        }
    }

    @Transactional
    public void deleteInstitution(Integer id) {
        try {
            Institution institution = institutionRepository.findById(id);
            if (institution != null) {
                List<Event> events = eventRepository.findByInstitution(institution);
                if (!events.isEmpty()) {
                    throw new RuntimeException("Não é possível excluir a instituição, pois existem eventos vinculados a ela.");
                }
                institutionRepository.delete(institution);
            } else {
                throw new RuntimeException("Instituição não encontrada com o ID: " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<String> getAllInstitutionTypes() {
        return Arrays.stream(InstitutionType.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }
}
