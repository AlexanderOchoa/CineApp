package com.mitocode.controller;

import com.mitocode.exception.ModeloNotFoundException;
import com.mitocode.model.Cliente;
import com.mitocode.service.IClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

	@Autowired
	private IClienteService service;
	
	@GetMapping
	public ResponseEntity<List<Cliente>> listar(){
		List<Cliente> lista = service.listar();
		return new ResponseEntity<>(lista, HttpStatus.OK);
	}

	@GetMapping(value="/pageable", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Page<Cliente>> listarPageable(Pageable pageable){
		Page<Cliente> clientes = service.listarPageable(pageable);
		return new ResponseEntity<>(clientes, HttpStatus.OK);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Cliente> listarPorId(@PathVariable("id") Integer id){
		
		Cliente cli = service.leer(id);
		if(cli.getIdCliente() == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO : " + id);
		}

		return new ResponseEntity<>(cli, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Cliente> registrar(@RequestPart("cliente") Cliente clienteRequest,
											 @RequestPart("file") MultipartFile file) throws IOException {
		if (file != null) {
			clienteRequest.setFoto(file.getBytes());
		}
		service.registrar(clienteRequest);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<Object> modificar(@RequestPart("cliente") Cliente clienteRequest,
											@RequestPart("file") MultipartFile file) throws IOException {
		if (file != null) {
			clienteRequest.setFoto(file.getBytes());
		}
		service.modificar(clienteRequest);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/{id}")
	public void eliminar(@PathVariable("id") Integer id){
		Cliente gen = service.leer(id);

		if (gen.getIdCliente() == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO: " + id);
		} else {
			service.eliminar(id);
		}
	}
	
	@GetMapping(value = "/foto/{id}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	public ResponseEntity<byte[]> obtenerFoto(@PathVariable("id") Integer id) {
		Cliente cli = service.leer(id);
		byte[] foto = cli.getFoto();
		return new ResponseEntity<>(foto, HttpStatus.OK);
	}

}
