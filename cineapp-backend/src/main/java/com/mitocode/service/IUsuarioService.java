package com.mitocode.service;

import com.mitocode.model.Usuario;

public interface IUsuarioService extends ICRUD<Usuario> {
	Usuario registrarTransaccional(Usuario us);
	Usuario obtenerPorNombre(String nombre);
}
