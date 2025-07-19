package com.twitter.demo.dto.mapper;

import com.twitter.demo.dto.LikeDto;
import com.twitter.demo.dto.TweetDto;
import com.twitter.demo.dto.UserDto;
import com.twitter.demo.model.AppUser;
import com.twitter.demo.model.Like;

import java.util.ArrayList;
import java.util.List;

public class LikeDtoMapper {

    // Convert a single Like to LikeDto
    public static LikeDto toLikeDto(Like like, AppUser reqUser) {
        UserDto user = UserDtoMapper.toUserDto(like.getUser());  // ✅ fix: call static method from UserDtoMapper
        TweetDto tweetDto = TweetDtoMapper.toTweetDto(like.getTweet(), reqUser);  // ✅ fix

        LikeDto likeDto = new LikeDto();
        likeDto.setId(like.getId());
        likeDto.setTweet(tweetDto);
        likeDto.setUser(user);

        return likeDto;
    }

    // Convert a list of Likes to List<LikeDto>
    public static List<LikeDto> toLikeDtos(List<Like> likes, AppUser reqUser) {
        List<LikeDto> likeDtos = new ArrayList<>();

        for (Like like : likes) {  // ✅ FIX: declare and loop over likes properly
            LikeDto likeDto = toLikeDto(like, reqUser);  // ✅ reuse method above
            likeDtos.add(likeDto);
        }

        return likeDtos;  // ✅ moved return inside method
    }
}
