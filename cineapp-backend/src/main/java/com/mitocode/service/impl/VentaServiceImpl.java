package com.mitocode.service.impl;

import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mitocode.dto.FiltroConsultaDTO;
import com.mitocode.dto.ResumenVentaDTO;
import com.mitocode.dto.VentaDTO;
import com.mitocode.model.Venta;
import com.mitocode.model.VentaComida;
import com.mitocode.repo.IVentaComidaRepo;
import com.mitocode.repo.IVentaRepo;
import com.mitocode.service.IVentaService;

import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperPrintManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class VentaServiceImpl implements IVentaService{

	@Autowired
	private IVentaRepo repo;

	@Autowired
	private IVentaComidaRepo vcRepo;
	
	@Override
	public Venta registrar(Venta t) {
		return repo.save(t);
	}
	
	@Transactional
	@Override
	public Venta registrarTransaccional(VentaDTO ventaDTO) {		
		ventaDTO.getVenta().getDetalle().forEach(det -> det.setVenta(ventaDTO.getVenta()));
		repo.save(ventaDTO.getVenta());
		
		ventaDTO.getLstComidas().forEach( c -> vcRepo.registrar(ventaDTO.getVenta().getIdVenta() , c.getIdComida()));
		return ventaDTO.getVenta();
	}

	@Override
	public Venta modificar(Venta t) {
		return repo.save(t);
	}

	@Override
	public List<Venta> listar() {
		return repo.findAll();
	}

	@Override
	public Venta leer(Integer id) {
		Optional<Venta> op = repo.findById(id);
		return op.isPresent() ? op.get() : new Venta();
	}

	@Override
	public void eliminar(Integer id) {
		repo.deleteById(id);
		
	}

	@Override
	public byte[] generarReporte(VentaDTO venta) {
		byte[] data = null;

		try {
			Map<String, Object> parametros = new HashMap<>();
			parametros.put("cliente", venta.getVenta().getCliente().getNombres());
			parametros.put("pelicula", venta.getVenta().getPelicula().getNombre());
			parametros.put("total", "S/ " + venta.getVenta().getTotal());
			parametros.put("asientos", venta.getVenta().getDetalle().stream().map(Object::toString).collect(Collectors.joining(",")));		
			
			File file = new ClassPathResource("/reports/impresion.jasper").getFile();
			JasperPrint print = JasperFillManager.fillReport(file.getPath(), parametros,
					new JRBeanCollectionDataSource(venta.getLstComidas()));
			data = JasperExportManager.exportReportToPdf(print);
			
			// Imprime y no muestra cuadro dialogo, debido a que es web y no desktop awt
			JasperPrintManager.printReport(print, false);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return data;
	}
	
	@Override
	public List<Venta> buscar(FiltroConsultaDTO filtro) {
		return repo.buscar(filtro.getDni(), filtro.getNombreCompleto());
	}

	@Override
	public List<Venta> buscarfecha(FiltroConsultaDTO filtro) {
		LocalDateTime fechaSgte = filtro.getFechaConsulta().plusDays(1);
		return repo.buscarFecha(filtro.getFechaConsulta(), fechaSgte);
	}
	
	@Override
	public List<VentaComida> listarComidasPorVenta(Integer idVenta) {
		return repo.listarComidasPorVenta(idVenta);
	}

	@Override
	public List<ResumenVentaDTO> listarResumen() {
		List<ResumenVentaDTO> ventas = new ArrayList<>();

		// List<Object[]>
		// cantidad fecha
		// [1 , 10/03/2019]
		// [2 , 10/03/2019]
		repo.listarResumen().forEach(x -> {
			ResumenVentaDTO cr = new ResumenVentaDTO();
			cr.setCantidad(Integer.parseInt(String.valueOf(x[0])));
			cr.setFecha(String.valueOf(x[1]));
			ventas.add(cr);
		});
		return ventas;
	}
}
