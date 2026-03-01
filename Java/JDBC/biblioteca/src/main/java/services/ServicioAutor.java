package services;
import entidades.Autor;

import java.util.Date;
import java.util.List;

public interface ServicioAutor {
	List<Autor>listadoAutores();
	void insertarAutor(String nombre, Date fechanacimiento);
}