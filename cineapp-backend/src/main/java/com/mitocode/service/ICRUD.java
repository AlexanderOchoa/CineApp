package com.mitocode.service;

import java.util.List;

public interface ICRUD<T> {

	T registrar(T t);
	T modificar(T t);
	List<T> listar();
	T leer(Integer id);
	void eliminar(Integer id);
}
