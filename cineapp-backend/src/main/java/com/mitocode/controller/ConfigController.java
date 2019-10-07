package com.mitocode.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mitocode.model.Config;
import com.mitocode.service.IConfigService;

@RestController
@RequestMapping("/configuraciones")
public class ConfigController {

	@Autowired
	private IConfigService service;
	
	@GetMapping
	public List<Config> listar(){
		return service.listar();		
	}
	
	@GetMapping(value = "/{id}")
	public Config listarPorId(@PathVariable("id") Integer id){
		return service.leer(id);
	}
	
	@GetMapping(value = "/buscar/{param}")
	public Config listarPorId(@PathVariable("param") String param){
		return service.leerParametro(param);
	}
	
	@PostMapping
	public Config registrar(@RequestBody Config config) {
		return service.registrar(config);
	}
	
	@PutMapping
	public Config modificar(@RequestBody Config config) {
		return service.modificar(config);
	}
	
	@DeleteMapping(value = "/{id}")
	public void eliminar(@PathVariable("id") Integer id) {
		service.eliminar(id);
	}
}
