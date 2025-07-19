package com.twitter.demo.dto.mapper;

import com.twitter.demo.dto.TweetDto;
import com.twitter.demo.dto.UserDto;
import com.twitter.demo.model.AppUser;
import com.twitter.demo.model.Tweets;
import com.twitter.demo.util.TweetUtil;

import java.util.ArrayList;
import java.util.List;

public class TweetDtoMapper {

    public static TweetDto toTweetDto(Tweets tweet, AppUser reqUser) {
        UserDto user = UserDtoMapper.toUserDto(tweet.getUser());  // ✅ FIX: Make sure this method exists and is public static
        boolean isLiked = TweetUtil.isLikedByReqUser(reqUser, tweet);
        boolean isRetweeted = TweetUtil.isRetweetedByReqUser(reqUser, tweet);

        List<Long> reTweetUserId = new ArrayList<>();
        for (AppUser user1 : tweet.getReTweetUser()) {
            reTweetUserId.add(user1.getId());
        }

        TweetDto tweetDto = new TweetDto();
        tweetDto.setId(tweet.getId());
        tweetDto.setContent(tweet.getContent());
        tweetDto.setCreatedAt(tweet.getCreatedAt());
        tweetDto.setImage(tweet.getImage());
        tweetDto.setTotalLikes(tweet.getLikes().size());
        tweetDto.setTotalReplies(tweet.getReplyTweets().size());  // ✅ FIXED from tweetDto.getTotalReplies()
        tweetDto.setTotalRetweets(tweet.getReTweetUser().size());
        tweetDto.setUser(user);
        tweetDto.setLiked(isLiked);
        tweetDto.setRetweet(isRetweeted);
        tweetDto.setReTweetUsersId(reTweetUserId);
        tweetDto.setReplyTweets(toTweetDtos(tweet.getReplyTweets(), reqUser));  // ✅ FIXED: tweet.getReplyTweets()
        tweetDto.setVideo(tweet.getVideo());

        return tweetDto;
    }

    public static List<TweetDto> toTweetDtos(List<Tweets> tweets, AppUser reqUser) {
        List<TweetDto> tweetDtos = new ArrayList<>();
        for (Tweets tweet : tweets) {
            TweetDto tweetDto = toReplyTweetDto(tweet, reqUser);
            tweetDtos.add(tweetDto);
        }
        return tweetDtos;
    }

    private static TweetDto toReplyTweetDto(Tweets tweet, AppUser reqUser) {
        UserDto user = UserDtoMapper.toUserDto(tweet.getUser());  // ✅ FIX: ensure this method exists
        boolean isLiked = TweetUtil.isLikedByReqUser(reqUser, tweet);
        boolean isRetweeted = TweetUtil.isRetweetedByReqUser(reqUser, tweet);

        List<Long> reTweetUserId = new ArrayList<>();
        for (AppUser user1 : tweet.getReTweetUser()) {
            reTweetUserId.add(user1.getId());
        }

        TweetDto tweetDto = new TweetDto();
        tweetDto.setId(tweet.getId());
        tweetDto.setContent(tweet.getContent());
        tweetDto.setCreatedAt(tweet.getCreatedAt());
        tweetDto.setImage(tweet.getImage());
        tweetDto.setTotalLikes(tweet.getLikes().size());
        tweetDto.setTotalReplies(tweet.getReplyTweets().size());  // ✅ FIXED
        tweetDto.setTotalRetweets(tweet.getReTweetUser().size());
        tweetDto.setUser(user);
        tweetDto.setLiked(isLiked);
        tweetDto.setRetweet(isRetweeted);
        tweetDto.setReTweetUsersId(reTweetUserId);
        tweetDto.setVideo(tweet.getVideo());

        return tweetDto;
    }
}
