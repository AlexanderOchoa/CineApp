	package com.mitocode.repo;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mitocode.model.Venta;
import com.mitocode.model.VentaComida;

public interface IVentaRepo extends JpaRepository<Venta, Integer>{

	@Query("from Venta v where v.cliente.dni =:dni or LOWER(v.cliente.nombres) like %:nombreCompleto% or LOWER(v.cliente.apellidos) like %:nombreCompleto%")
	List<Venta> buscar(@Param("dni")String dni, @Param("nombreCompleto")String nombreCompleto);
	
	@Query("from Venta v where v.fecha between :fechaConsulta and :fechaSgte")
	List<Venta> buscarFecha(@Param("fechaConsulta") LocalDateTime fechaConsulta, @Param("fechaSgte") LocalDateTime fechaSgte);

	@Query("from VentaComida vc where vc.venta.idVenta = :idVenta")
	List<VentaComida> listarComidasPorVenta(@Param("idVenta") Integer idVenta);
	
	@Query(value = "select * from fn_listarResumen()", nativeQuery = true)
	List<Object[]> listarResumen();
}
