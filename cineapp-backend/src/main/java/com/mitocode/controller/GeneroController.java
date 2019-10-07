package com.mitocode.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mitocode.model.Genero;
import com.mitocode.service.IGeneroService;

@RestController
@RequestMapping("/generos")
public class GeneroController {

	@Autowired
	private IGeneroService service;
	
	@GetMapping
	public List<Genero> listar(){
		return service.listar();
	}
	
	@GetMapping(value="/pageable", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Page<Genero>> listarPageable(Pageable pageable){
		Page<Genero> pacientes;
		pacientes = service.listarPageable(pageable);
		return new ResponseEntity<Page<Genero>>(pacientes, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public Genero leer(@PathVariable("id") Integer idGenero) {
		return service.leer(idGenero);
	}
	
	@PostMapping
	public Genero registrar(@RequestBody Genero per) {
		return service.registrar(per);
	}
	
	@PutMapping
	public Genero modificar(@RequestBody Genero per) {
		return service.modificar(per);
	}
	
	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable("id") Integer idGenero) {
		service.eliminar(idGenero);
	}
}
