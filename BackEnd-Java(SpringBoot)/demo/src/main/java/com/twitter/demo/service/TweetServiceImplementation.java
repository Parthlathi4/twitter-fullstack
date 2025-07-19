package com.twitter.demo.service;

import com.twitter.demo.exception.TweetException;
import com.twitter.demo.exception.UserException;
import com.twitter.demo.model.AppUser;
import com.twitter.demo.model.Tweets;
import com.twitter.demo.repository.TweetRepository;
import com.twitter.demo.request.TweetReplyRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TweetServiceImplementation implements TweetService {

    @Autowired
    private TweetRepository tweetRepository;

    @Override
    public Tweets CreateTweets(Tweets req, AppUser user) throws UserException {
        Tweets tweets = new Tweets();
        tweets.setContent(req.getContent());
        tweets.setCreatedAt(LocalDateTime.now());
        tweets.setImage(req.getImage());
        tweets.setUser(user);
        tweets.setReply(false);
        tweets.setTweet(true);
        tweets.setVideo(req.getVideo());

        return tweetRepository.save(tweets);
    }

    @Override
    public List<Tweets> FindAllTweets() {
        // ✅ Fixed method name: was `findAllByisTweetTrueOrderByCreatedAtDesc`
        return tweetRepository.findAllByTweetTrueOrderByCreatedAtDesc();
    }

    @Override
    public Tweets ReTweet(Long tweetId, AppUser user) throws UserException, TweetException {
        Tweets tweets = FindById(tweetId);
        if (tweets.getReTweetUser().contains(user)) {
            tweets.getReTweetUser().remove(user);
        } else {
            tweets.getReTweetUser().add(user);
        }
        return tweetRepository.save(tweets);
    }

    @Override
    public Tweets FindById(Long tweetId) throws TweetException {
        return tweetRepository.findById(tweetId)
                .orElseThrow(() -> new TweetException("Tweet Not Found With Id " + tweetId));
    }

    @Override
    public void DeleteTweetById(Long tweetId, Long userId) throws TweetException, UserException {
        Tweets tweets = FindById(tweetId);
        if (!userId.equals(tweets.getUser().getId())) {
            throw new UserException("You can't Delete Another User's tweet");
        }
        tweetRepository.deleteById(tweets.getId());
    }

    @Override
    public Tweets RemoveFromRetweet(Long tweetId, AppUser user) throws TweetException, UserException {
        // ⚠️ You already implemented remove in ReTweet(), so you can safely remove this if unused.
        // If you want this as separate logic, uncomment below:

        /*
        Tweets tweets = FindById(tweetId);
        if (tweets.getReTweetUser().contains(user)) {
            tweets.getReTweetUser().remove(user);
            return tweetRepository.save(tweets);
        }
        return tweets;
        */

        return null; // Optional: or delete this method completely if not used anywhere
    }

    @Override
    public Tweets CreateReply(TweetReplyRequest req, AppUser user) throws TweetException {
        Tweets ReplyFor = FindById(req.getTweetId());

        Tweets tweets = new Tweets();
        tweets.setContent(req.getContent());
        tweets.setCreatedAt(LocalDateTime.now());
        tweets.setImage(req.getImage());
        tweets.setUser(user);
        tweets.setReply(true);
        tweets.setTweet(false);
        tweets.setReplyFor(ReplyFor);

        Tweets savedReply = tweetRepository.save(tweets);
        ReplyFor.getReplyTweets().add(savedReply); // Optional: bi-directional update
        tweetRepository.save(ReplyFor);

        return ReplyFor;
    }

    @Override
    public List<Tweets> getUserTweet(AppUser user) {
        // ✅ Fixed method name casing and field: was `findByreTweetUserContainsOrUser_IdAndIsTweetTrueOrderByCreatedAtDesc`
        return tweetRepository.findByReTweetUserContainsOrUser_IdAndTweetTrueOrderByCreatedAtDesc(user, user.getId());
    }

    @Override
    public List<Tweets> findByLikesContainsAppUser(AppUser user) {
        return tweetRepository.findByLikesUser_id(user.getId());
    }
}
