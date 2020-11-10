package com.ouri.tree;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ouri.tree.dao.User;
import com.ouri.tree.dao.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {
	
	@Autowired
	UserRepository repo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user = repo.findByUsername(username);
		
		if (user == null) {
			throw new UsernameNotFoundException(username+ " Not Found") ;
		}
		return new UserPrincipal(user);
	}

}
