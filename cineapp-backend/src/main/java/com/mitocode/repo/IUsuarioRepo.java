package com.mitocode.repo;

import com.mitocode.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IUsuarioRepo extends JpaRepository<Usuario, Integer>{

	Usuario findOneByUsername(String username);
	
	@Modifying
	@Query(value = "INSERT INTO usuario_rol (id_usuario, id_rol) VALUES (:idUsuario, :idRol)", nativeQuery = true)
	void registrarRolPorDefecto(@Param("idUsuario") Integer idUsuario, @Param("idRol") Integer idRol);

	@Modifying
	@Query(value = "UPDATE Usuario set foto = :foto where id = :id")
	void modificarFoto(@Param("id") Integer id, @Param("foto") byte[] foto);

}
