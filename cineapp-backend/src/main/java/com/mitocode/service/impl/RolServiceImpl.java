package com.mitocode.service.impl;

import com.mitocode.model.Rol;
import com.mitocode.repo.IRolRepo;
import com.mitocode.service.IRolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RolServiceImpl implements IRolService {

	@Autowired
	private IRolRepo repo;

	@Override
	public List<Rol> listarRolPorUsuario(String nombre) {
		List<Rol> roles = new ArrayList<>();
		repo.listarRolPorUsuario(nombre).forEach( x -> {
			Rol rol = new Rol();
			rol.setIdRol((Integer.parseInt(String.valueOf(x[0]))));
			rol.setDescripcion(String.valueOf(x[1]));
			rol.setNombre(String.valueOf(x[2]));
			roles.add(rol);
		});

		return roles;
	}

	@Override
	public Rol registrar(Rol rol) {
		return null;
	}

	@Override
	public Rol modificar(Rol rol) {
		return null;
	}

	@Override
	public List<Rol> listar() {
		return null;
	}

	@Override
	public Rol leer(Integer id) {
		return null;
	}

	@Override
	public void eliminar(Integer id) {

	}
}
