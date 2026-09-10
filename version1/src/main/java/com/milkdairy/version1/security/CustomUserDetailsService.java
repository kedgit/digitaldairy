package com.milkdairy.version1.security;

import com.milkdairy.version1.user.User;
import com.milkdairy.version1.user.UserRepository;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

        private final UserRepository userRepository;

        public CustomUserDetailsService(UserRepository userRepository) {
                this.userRepository = userRepository;
        }

        @Override
        public UserDetails loadUserByUsername(String username) {

                User user = userRepository.findByUsername(username)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

                return convertToUserDetails(user);
        }

        public UserDetails loadUserByUserId(Long userId) {

                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

                return convertToUserDetails(user);
        }

        private UserDetails convertToUserDetails(User user) {

                return new CustomUserDetails(
                                        user.getUserId(),
                                        user.getUsername(),
                                        user.getPassword(),
                                        List.of(
                                                new SimpleGrantedAuthority("ROLE_" + user.getRole())
                                        )
                                );
        }
}