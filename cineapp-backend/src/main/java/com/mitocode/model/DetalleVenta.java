package com.mitocode.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "detalle_venta")
public class DetalleVenta {

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "id_venta", nullable = false, foreignKey = @ForeignKey(name = "fk_detalle_venta"))
	private Venta venta;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idDetalle;

	@Column(name = "asiento", length = 3)
	private String asiento;

	public Venta getVenta() {
		return venta;
	}

	public void setVenta(Venta venta) {
		this.venta = venta;
	}

	public Integer getIdDetalle() {
		return idDetalle;
	}

	public void setIdDetalle(Integer idDetalle) {
		this.idDetalle = idDetalle;
	}

	public String getAsiento() {
		return asiento;
	}

	public void setAsiento(String asiento) {
		this.asiento = asiento;
	}

}
