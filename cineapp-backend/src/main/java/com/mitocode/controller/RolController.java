package com.mitocode.controller;

import com.mitocode.model.Rol;
import com.mitocode.service.IRolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RolController {
	
	@Autowired
	private IRolService service;
	
	@PostMapping(value = "/usuario", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Rol>> listar(@RequestBody String nombre) {
		return new ResponseEntity<>(service.listarRolPorUsuario(nombre), HttpStatus.OK);
	}
	
}
