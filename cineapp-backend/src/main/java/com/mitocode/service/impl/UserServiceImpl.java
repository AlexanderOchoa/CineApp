package com.mitocode.service.impl;

import com.mitocode.model.Usuario;
import com.mitocode.repo.IUsuarioRepo;
import com.mitocode.service.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserDetailsService, IUsuarioService {
	
	@Autowired
	private IUsuarioRepo userRepo;
	
	@Value("${mitocine.default-rol}")
	private Integer DEFAULT_ROL;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario user = userRepo.findOneByUsername(username); //from usuario where username := username
		
		if (user == null) {
			throw new UsernameNotFoundException(String.format("Usuario no existe", username));
		}
		
		List<GrantedAuthority> authorities = new ArrayList<>();
		
		user.getRoles().forEach( role -> {
			authorities.add(new SimpleGrantedAuthority(role.getNombre()));
		});
		
		UserDetails userDetails = new User(user.getUsername(), user.getPassword(), authorities);
		
		return userDetails;
	}

	@Transactional
	@Override
	public Usuario registrarTransaccional(Usuario usuario) {	
		Usuario u;
		try {
			u = userRepo.save(usuario);	
			userRepo.registrarRolPorDefecto(u.getIdUsuario(), DEFAULT_ROL);	
		}catch(Exception e) {
			throw e;
		}
		
		return u;
		
	}

	@Override
	public Usuario obtenerPorNombre(String nombre) {
		return userRepo.findOneByUsername(nombre);
	}

	@Override
	public Usuario registrar(Usuario usuario) {
		return null;
	}

	@Transactional
	@Override
	public Usuario modificar(Usuario usuario) {
		if (usuario.getFoto().length > 0) {
			userRepo.modificarFoto(usuario.getIdUsuario(), usuario.getFoto());
		}

		return userRepo.save(usuario);
	}

	@Override
	public List<Usuario> listar() {
		return null;
	}

	@Override
	public Usuario leer(Integer id) {
		return null;
	}

	@Override
	public void eliminar(Integer id) {

	}
}
