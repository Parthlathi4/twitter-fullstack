package com.twitter.demo.request;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TweetReplyRequest {
    private String content;
    private Long tweetId;           // fixed: renamed TweetId → tweetId
    private LocalDateTime createdAt;
    private String image;           // fixed: renamed Image → image
}
