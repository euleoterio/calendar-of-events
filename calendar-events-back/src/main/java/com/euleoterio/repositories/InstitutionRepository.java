package com.euleoterio.repositories;

import com.euleoterio.models.Institution;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class InstitutionRepository implements PanacheRepositoryBase<Institution, Integer> {
}
