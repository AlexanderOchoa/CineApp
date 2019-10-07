package com.mitocode.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.mitocode.model.Usuario;
import com.mitocode.service.IUsuarioService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

	@Autowired
	private IUsuarioService service;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	@PostMapping(produces = "application/json", consumes = "application/json")
	private ResponseEntity<Object> registrar(@RequestBody Usuario usuario){		
		usuario.setPassword(bcrypt.encode(usuario.getPassword()));
		service.registrarTransaccional(usuario);
		return new ResponseEntity<Object>(HttpStatus.CREATED);
	}

	@GetMapping(value = "/foto/{nombre}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	public ResponseEntity<byte[]> obtenerFoto(@PathVariable("nombre") String nombre) {
		Usuario usuario = service.obtenerPorNombre(nombre);
		byte[] foto = usuario.getFoto();
		return new ResponseEntity<>(foto, HttpStatus.OK);
	}

	@PutMapping
	public ResponseEntity<Object> modificar(@RequestPart("usuario") Usuario usuario,
											 @RequestPart("file")MultipartFile file) throws IOException {
		Usuario u = service.obtenerPorNombre(usuario.getUsername());
		u.setUsername(usuario.getUsername());
		u.setFoto(file.getBytes());
		service.modificar(u);
		return new ResponseEntity<>("", HttpStatus.OK);
	}

}