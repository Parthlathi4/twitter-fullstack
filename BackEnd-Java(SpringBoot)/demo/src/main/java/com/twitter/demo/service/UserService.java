package com.twitter.demo.service;

import com.twitter.demo.exception.UserException;
import com.twitter.demo.model.AppUser;

import java.util.List;

public interface UserService {
    public AppUser findUserById(Long userId) throws UserException;
    public AppUser findUserProfileByJwt(String jwt) throws UserException;
    public AppUser updateUser(Long userId,AppUser user) throws UserException;
    public AppUser followUser(Long userId,AppUser user) throws UserException;
    public List<AppUser>searchUser (String query);
}
