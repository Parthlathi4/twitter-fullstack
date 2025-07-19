package com.twitter.demo.repository;

import com.twitter.demo.model.AppUser;
import com.twitter.demo.model.Tweets;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TweetRepository extends JpaRepository<Tweets, Long> {

    // Get all tweets (not replies) sorted by newest
    List<Tweets> findAllByTweetTrueOrderByCreatedAtDesc();

    // For home feed: tweets by reTweetUser or by user directly
    List<Tweets> findByReTweetUserContainsOrUser_IdAndTweetTrueOrderByCreatedAtDesc(AppUser user, Long userId);

    // Find tweets liked by a user
    @Query("SELECT t FROM Tweets t JOIN t.likes l WHERE l.user.id = :userId")
    List<Tweets> findByLikesUser_id(Long userId);
}
