package com.twitter.demo.service;

import com.twitter.demo.config.JwtProvider;
import com.twitter.demo.exception.UserException;
import com.twitter.demo.model.AppUser;
import com.twitter.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public AppUser findUserById(Long userId) throws UserException {
        AppUser user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException("user not found with id " + userId));
        return user;
    }

    @Override
    public AppUser findUserProfileByJwt(String jwt) throws UserException {
        String email = jwtProvider.getEmailFromToken(jwt);
        AppUser user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UserException("user not found with email " + email);
        }
        return user;
    }

    @Override
    public AppUser updateUser(Long userId, AppUser req) throws UserException {
        AppUser user = findUserById(userId);

        if (req.getFullName() != null) user.setFullName(req.getFullName());
        if (req.getImage() != null) user.setImage(req.getImage());
        if (req.getBackgroundImage() != null) user.setBackgroundImage(req.getBackgroundImage());
        if (req.getBirthDate() != null) user.setBirthDate(req.getBirthDate());
        if (req.getLocation() != null) user.setLocation(req.getLocation());
        if (req.getBio() != null) user.setBio(req.getBio());
        if (req.getWebsite() != null) user.setWebsite(req.getWebsite());

        return userRepository.save(user); // 🔧 FIXED: no longer static
    }

    @Override
    public AppUser followUser(Long userId, AppUser user) throws UserException {
        AppUser followToUser = findUserById(userId);

        // 🔧 FIXED: added proper parenthesis
        if (user.getFollowings().contains(followToUser) && followToUser.getFollowers().contains(user)) {
            user.getFollowings().remove(followToUser);
            followToUser.getFollowers().remove(user);
        } else {
            user.getFollowings().add(followToUser);
            followToUser.getFollowers().add(user);
        }

        userRepository.save(followToUser);
        userRepository.save(user);
        return followToUser;
    }

    @Override
    public List<AppUser> searchUser(String query) {
        return userRepository.searchUser(query);
    }
}
