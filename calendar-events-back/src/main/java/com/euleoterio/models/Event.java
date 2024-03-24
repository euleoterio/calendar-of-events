package com.euleoterio.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
public class Event extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @NotBlank
    @NotNull
    public String title;

    public String description;

    @NotNull
    public LocalDate startsDate;

    @NotNull
    public LocalDate endsDate;

    public boolean status = true;

    @ManyToOne
    @JsonBackReference
    public Institution institution;
}