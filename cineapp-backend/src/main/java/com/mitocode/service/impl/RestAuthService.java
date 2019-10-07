package com.mitocode.service.impl;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class RestAuthService {	

	public boolean hasAccess(String path) {
		boolean rpta = false;
		
		String metodoRol = "";

		// /listar
		switch (path) {
		case "listar":
			metodoRol = "ADMIN";
			break;

		case "listarId":
			metodoRol = "ADMIN,USER,DBA";
			break;
		}
		
		String metodoRoles[] = metodoRol.split(",");
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (!(authentication instanceof AnonymousAuthenticationToken)) {
			
			System.out.println(authentication.getName());
			
			for (GrantedAuthority auth : authentication.getAuthorities()) {
				String rolUser = auth.getAuthority();
				
				System.out.println(rolUser);
				
				for (String rolMet : metodoRoles) { 
					if (rolUser.equalsIgnoreCase(rolMet)) {
						rpta = true;
					}
				}
			}
		}
		return rpta;
	}
}
