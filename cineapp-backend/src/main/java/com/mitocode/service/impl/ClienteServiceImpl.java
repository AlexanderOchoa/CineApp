package com.mitocode.service.impl;

import com.mitocode.model.Cliente;
import com.mitocode.repo.IClienteRepo;
import com.mitocode.service.IClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteServiceImpl implements IClienteService{

	@Autowired
	private IClienteRepo repo;
	
	@Override
	@Transactional
	public Cliente registrar(Cliente obj) {
		return repo.save(obj);
	}

	@Override
	@Transactional
	public Cliente modificar(Cliente obj) {
		if (obj.getFoto().length > 0) {
			repo.modificarFoto(obj.getIdCliente(), obj.getFoto());
		}

		return repo.save(obj);
	}

	@Override
	public List<Cliente> listar() {
		return repo.findAll();
	}

	@Override
	public Cliente leer(Integer id) {
		Optional<Cliente> op = repo.findById(id);
		return op.isPresent() ? op.get() : new Cliente();
	}

	@Override
	public void eliminar(Integer id) {
		repo.deleteById(id);
	}

	@Override
	public Page<Cliente> listarPageable(Pageable pageable) {
		return repo.findAll(pageable);
	}
	
}
