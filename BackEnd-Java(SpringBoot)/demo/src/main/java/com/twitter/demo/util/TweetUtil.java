package com.twitter.demo.util;

import com.twitter.demo.model.AppUser;
import com.twitter.demo.model.Like;
import com.twitter.demo.model.Tweets;

public class TweetUtil {
    public final static boolean isLikedByReqUser(AppUser reqUser, Tweets tweets){
        for(Like like : tweets.getLikes()){
            if(like.getUser().getId()==(reqUser.getId())){
                return true;
            }
        }
        return false;
    }
    public final static boolean isRetweetedByReqUser(AppUser reqUser,Tweets tweets){
        for(AppUser user : tweets.getReTweetUser() ){
            if(user.getId()==(reqUser.getId())){
                return true;
            }
        }
        return false;
    }
}
