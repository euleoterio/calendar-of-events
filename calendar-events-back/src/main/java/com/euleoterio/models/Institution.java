package com.euleoterio.models;

import com.euleoterio.enums.InstitutionType;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
public class Institution extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @NotBlank
    @NotNull
    public String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    public InstitutionType type;

    @OneToMany(mappedBy = "institution")
    @JsonManagedReference
    public List<Event> events;
}
