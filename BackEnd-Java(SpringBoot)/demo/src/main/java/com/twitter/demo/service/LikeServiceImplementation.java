package com.twitter.demo.service;

import com.twitter.demo.exception.TweetException;
import com.twitter.demo.exception.UserException;
import com.twitter.demo.model.AppUser;
import com.twitter.demo.model.Like;
import com.twitter.demo.model.Tweets;
import com.twitter.demo.repository.LikeRepository;
import com.twitter.demo.repository.TweetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImplementation implements LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private TweetService tweetService;

    @Autowired
    private TweetRepository tweetRepository;

    @Override
    public Like likeTweet(Long tweetId, AppUser user) throws UserException, TweetException {
        Like isLikeExist = likeRepository.isLikeExist(user.getId(), tweetId);
        if (isLikeExist != null) {
            likeRepository.deleteById(isLikeExist.getId());
            return isLikeExist;
        }

        Tweets tweets = tweetService.FindById(tweetId);  // match TweetService method name
        Like like = new Like();
        like.setTweet(tweets);      // lowercase 'like'
        like.setUser(user);
        Like savedLike = likeRepository.save(like);
        tweets.getLikes().add(savedLike);
        tweetRepository.save(tweets);
        return savedLike;
    }

    @Override
    public List<Like> getAllLikes(Long tweetId) throws TweetException {
        Tweets tweets = tweetService.FindById(tweetId);
        List<Like> likes = likeRepository.findByTweetId(tweetId);
        return likes;
    }
}
