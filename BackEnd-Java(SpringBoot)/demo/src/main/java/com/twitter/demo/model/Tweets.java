package com.twitter.demo.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Tweets {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id") // Optional, helps in DB clarity
    private AppUser user;

    private String content;
    private String image;
    private String video;

    @OneToMany(mappedBy = "tweet", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "replyFor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Tweets> replyTweets = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "retweets",
            joinColumns = @JoinColumn(name = "tweet_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<AppUser> reTweetUser = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reply_for_id")
    private Tweets replyFor;

    private boolean reply; // true if it's a reply
    private boolean tweet; // true if it's a tweet (not a reply)

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
