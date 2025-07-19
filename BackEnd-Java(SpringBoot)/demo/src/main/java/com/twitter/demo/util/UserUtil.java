package com.twitter.demo.util;

import com.twitter.demo.model.AppUser;

public class UserUtil {
    public static final boolean isReqUser(AppUser reqUser,AppUser user2){
        return reqUser.getId()==user2.getId();
    }
    public static final boolean isFollowedByReqUser(AppUser reqUser,AppUser user2){
        return reqUser.getFollowings().contains(user2);
    }
}
