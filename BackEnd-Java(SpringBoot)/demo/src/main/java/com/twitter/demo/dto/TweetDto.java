package com.twitter.demo.dto;

import com.twitter.demo.model.AppUser;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
@Data
public class TweetDto {
    private Long id;
    private String content;
    private String image;
    private String video;
    private UserDto user;
    private LocalDateTime createdAt;
    private int totalLikes;
    private int totalReplies;
    private int totalRetweets;
    private boolean isLiked;
    private boolean isRetweet;
    private List<Long>reTweetUsersId;
    private List<TweetDto>replyTweets;
}
