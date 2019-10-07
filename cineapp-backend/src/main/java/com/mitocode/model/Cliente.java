package com.mitocode.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "cliente")
public class Cliente {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idCliente;

	@JsonIgnore
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "cliente")
	private Usuario usuario;

	@Column(name = "nombres", nullable = false, length = 50)
	private String nombres;

	@Column(name = "apellidos", nullable = false, length = 50)
	private String apellidos;

	@Column(name = "fecha_nac", nullable = false)
	private LocalDate fechaNac;

	@Column(name = "dni", nullable = false, length = 8)
	private String dni;

	@Column(name = "foto", updatable = false)
	private byte[] foto;

	public Integer getIdCliente() {
		return idCliente;
	}

	public void setIdCliente(Integer idCliente) {
		this.idCliente = idCliente;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public LocalDate getFechaNac() {
		return fechaNac;
	}

	public void setFechaNac(LocalDate fechaNac) {
		this.fechaNac = fechaNac;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public byte[] getFoto() {
		return foto;
	}

	public void setFoto(byte[] foto) {
		this.foto = foto;
	}
}