package com.twitter.demo.Controller;

import com.twitter.demo.dto.UserDto;
import com.twitter.demo.dto.mapper.UserDtoMapper;
import com.twitter.demo.exception.UserException;
import com.twitter.demo.model.AppUser;
import com.twitter.demo.service.UserService;
import com.twitter.demo.util.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getUserProfile(@RequestHeader("Authorization") String jwt) throws UserException {
        AppUser user = userService.findUserProfileByJwt(jwt);
        UserDto userDto = UserDtoMapper.toUserDto(user);
        userDto.setReq_user(true);
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId,
                                               @RequestHeader("Authorization") String jwt) throws UserException {
        AppUser reqUser = userService.findUserProfileByJwt(jwt);
        AppUser user = userService.findUserById(userId);
        UserDto userDto = UserDtoMapper.toUserDto(user);
        userDto.setReq_user(UserUtil.isReqUser(reqUser, user));
        userDto.setFollowed(UserUtil.isFollowedByReqUser(reqUser, user));
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUser(@RequestParam String query,
                                                    @RequestHeader("Authorization") String jwt) throws UserException {
        AppUser reqUser = userService.findUserProfileByJwt(jwt);
        List<AppUser> users = userService.searchUser(query);
        List<UserDto> userDtos = UserDtoMapper.toUserDtos(users);
        return new ResponseEntity<>(userDtos, HttpStatus.ACCEPTED);
    }

    @PutMapping("/update")
    public ResponseEntity<UserDto> updateUser(@RequestBody AppUser req,
                                              @RequestHeader("Authorization") String jwt) throws UserException {
        AppUser reqUser = userService.findUserProfileByJwt(jwt);
        AppUser updatedUser = userService.updateUser(reqUser.getId(), req); // Match interface method name
        UserDto userDto = UserDtoMapper.toUserDto(updatedUser);
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{userId}/follow")
    public ResponseEntity<UserDto> followUser(@PathVariable Long userId,
                                              @RequestHeader("Authorization") String jwt) throws UserException {
        AppUser reqUser = userService.findUserProfileByJwt(jwt);
        AppUser updatedUser = userService.followUser(userId, reqUser);
        UserDto userDto = UserDtoMapper.toUserDto(updatedUser);
        userDto.setFollowed(UserUtil.isFollowedByReqUser(reqUser, updatedUser));
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }
}
