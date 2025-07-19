package com.twitter.demo.service;

import com.twitter.demo.exception.TweetException;
import com.twitter.demo.exception.UserException;
import com.twitter.demo.model.AppUser;
import com.twitter.demo.model.Tweets;
import com.twitter.demo.request.TweetReplyRequest;

import java.util.List;

public interface TweetService {
   public Tweets CreateTweets(Tweets rwq, AppUser user) throws UserException;
   public List<Tweets> FindAllTweets();
   public Tweets ReTweet(Long TweetId,AppUser user) throws UserException, TweetException;
   public Tweets FindById(Long TweetId) throws TweetException;
   public void DeleteTweetById(Long TweetId,Long UserId) throws TweetException,UserException;
   public Tweets RemoveFromRetweet(Long TweetId,AppUser user) throws TweetException,UserException;
   public Tweets CreateReply(TweetReplyRequest req, AppUser user) throws TweetException;
   public List<Tweets>getUserTweet(AppUser user);
   public List<Tweets>findByLikesContainsAppUser(AppUser user);

}
