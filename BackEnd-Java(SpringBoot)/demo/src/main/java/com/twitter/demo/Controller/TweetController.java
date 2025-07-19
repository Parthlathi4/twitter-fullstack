package com.twitter.demo.Controller;

import com.twitter.demo.dto.TweetDto;
import com.twitter.demo.dto.mapper.TweetDtoMapper;
import com.twitter.demo.exception.TweetException;
import com.twitter.demo.exception.UserException;
import com.twitter.demo.model.AppUser;
import com.twitter.demo.model.Tweets;
import com.twitter.demo.request.TweetReplyRequest;
import com.twitter.demo.response.ApiResponse;
import com.twitter.demo.service.TweetService;
import com.twitter.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/tweets/")
public class TweetController {

    @Autowired
    private TweetService tweetService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<TweetDto> createTweet(@RequestBody Tweets req, @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        AppUser user = userService.findUserProfileByJwt(jwt);
        Tweets tweet = tweetService.CreateTweets(req, user);
        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);
        return new ResponseEntity<>(tweetDto, HttpStatus.CREATED);
    }

    @PostMapping("/reply")
    public ResponseEntity<TweetDto> replyTweet(@RequestBody TweetReplyRequest req, @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        AppUser user = userService.findUserProfileByJwt(jwt);
        Tweets tweet = tweetService.CreateReply(req, user);
        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);
        return new ResponseEntity<>(tweetDto, HttpStatus.CREATED);
    }

    @PutMapping("/{tweetId}/ReTweet")
    public ResponseEntity<TweetDto> ReTweet(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        AppUser user = userService.findUserProfileByJwt(jwt);
        Tweets tweet = tweetService.ReTweet(tweetId, user);
        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);
        return new ResponseEntity<>(tweetDto, HttpStatus.OK);
    }

    @GetMapping("/{tweetId}")
    public ResponseEntity<TweetDto> findTweetById(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        AppUser user = userService.findUserProfileByJwt(jwt);
        Tweets tweet = tweetService.FindById(tweetId); // corrected to call from service
        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);
        return new ResponseEntity<>(tweetDto, HttpStatus.OK);
    }

    @DeleteMapping("/{tweetId}/")
    public ResponseEntity<ApiResponse> deleteTweet(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        AppUser user = userService.findUserProfileByJwt(jwt);
        tweetService.DeleteTweetById(tweetId, user.getId());
        ApiResponse res = new ApiResponse();
        res.setMessage("Tweet Deleted Successfully");
        res.setStatus(true);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<TweetDto>> getAllTweets(@RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        AppUser user = userService.findUserProfileByJwt(jwt);
        List<Tweets> tweets = tweetService.FindAllTweets();
        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets, user); // ✅ fixed
        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TweetDto>> getUsersAllTweets(@PathVariable Long userId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        AppUser user = userService.findUserProfileByJwt(jwt);
        List<Tweets> tweets = tweetService.getUserTweet(user);
        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets, user); // ✅ fixed
        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<List<TweetDto>> findTweetsByLikesContainsUser(@PathVariable Long userId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        AppUser user = userService.findUserProfileByJwt(jwt);
        List<Tweets> tweets = tweetService.findByLikesContainsAppUser(user);
        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets, user); // ✅ fixed
        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
    }
}
