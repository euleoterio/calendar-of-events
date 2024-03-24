package com.euleoterio.repositories;

import com.euleoterio.models.Event;
import com.euleoterio.models.Institution;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class EventRepository implements PanacheRepositoryBase<Event, Integer> {

    public List<Event> listAllOrderedByStartDate() {
        return find("ORDER BY startsDate").list();
    }

    public List<Event> findByInstitution(Institution institution) {
        return list("institution", institution);
    }
}
