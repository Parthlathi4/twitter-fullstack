package com.twitter.demo.service;

import com.twitter.demo.exception.TweetException;
import com.twitter.demo.exception.UserException;
import com.twitter.demo.model.AppUser;
import com.twitter.demo.model.Like;

import java.util.List;

public interface LikeService {

    Like likeTweet(Long tweetId, AppUser user) throws UserException, TweetException;

    List<Like> getAllLikes(Long tweetId) throws TweetException; // ✅ Fixed method name casing
}
