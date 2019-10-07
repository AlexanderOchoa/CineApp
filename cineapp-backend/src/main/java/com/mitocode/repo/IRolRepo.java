package com.mitocode.repo;

import com.mitocode.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IRolRepo extends JpaRepository<Rol, Integer>{

	@Query(value="select r.id_rol, r.nombre, r.descripcion\n" +
			"from usuario u \n" +
			"inner join usuario_rol ur on u.id_usuario = ur.id_usuario\n" +
			"inner join rol r on ur.id_rol = r.id_rol\n" +
			"where u.nombre=:nombre", nativeQuery = true)
	List<Object[]> listarRolPorUsuario(@Param("nombre") String nombre);
	
	//0 | [ 1, 'search', 'buscar', '/buscar']
	//1 | [ 2, 'register', 'registrar', '/consulta']
}
