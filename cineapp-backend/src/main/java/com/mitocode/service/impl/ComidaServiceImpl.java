package com.mitocode.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mitocode.model.Comida;
import com.mitocode.repo.IComidaRepo;
import com.mitocode.service.IComidaService;

@Service
public class ComidaServiceImpl implements IComidaService{

	@Autowired
	private IComidaRepo repo;
	
	@Override
	public Comida registrar(Comida t) { 
		return repo.save(t);
	}

	@Transactional
	@Override
	public Comida modificar(Comida t) {
		if(t.getFoto().length > 0) {
			repo.modificarFoto(t.getIdComida(), t.getFoto());			
		}		
		return repo.save(t);		
	}

	@Override
	public List<Comida> listar() {
		return repo.findAll();
	}

	@Override
	public Comida leer(Integer id) {
		Optional<Comida> op = repo.findById(id);
		return op.isPresent() ? op.get() : new Comida();
	}

	@Override
	public void eliminar(Integer id) {
		repo.deleteById(id);
	}

}
