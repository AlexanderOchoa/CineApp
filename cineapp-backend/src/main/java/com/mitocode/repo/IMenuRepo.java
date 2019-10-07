package com.mitocode.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mitocode.model.Menu;

public interface IMenuRepo extends JpaRepository<Menu, Integer>{

	@Query(value="select distinct m.* from menu_rol mr inner join usuario_rol ur 	on ur.id_rol = mr.id_rol\r\n" + 
			"							inner join menu m 			on m.id_menu = mr.id_menu\r\n" + 
			"							inner join usuario u 		on u.id_usuario = ur.id_usuario\r\n" + 
			"							inner join cliente c 	    on c.id_cliente = u.id_usuario\r\n" + 
			"where u.nombre = :nombre ;", nativeQuery = true)
	List<Object[]> listarMenuPorUsuario(@Param("nombre") String nombre);
	
	//0 | [ 1, 'search', 'buscar', '/buscar']
	//1 | [ 2, 'register', 'registrar', '/consulta']
}
