package com.mitocode.service;

import com.mitocode.model.Rol;

import java.util.List;

public interface IRolService extends ICRUD<Rol>{
	
	List<Rol> listarRolPorUsuario(String nombre);
}
