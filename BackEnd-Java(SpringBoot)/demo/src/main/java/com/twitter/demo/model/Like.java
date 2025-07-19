package com.twitter.demo.model;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "likes")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
private long id;
    @ManyToOne
private AppUser user;
    @ManyToOne
    private Tweets tweet;
}
