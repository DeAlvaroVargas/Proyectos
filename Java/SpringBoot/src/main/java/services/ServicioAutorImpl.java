package services;

import java.util.Date;
import java.util.List;

import dao.DaoAutor;
import entidades.Autor;
import dao.DaoAutorImpl;
public class ServicioAutorImpl implements ServicioAutor {
	public List<Autor>listadoAutores(){
		
		DaoAutor dao = new DaoAutorImpl();
		return dao.listadoAutores();
	}
	public void insertarAutor(String nombre, Date fechanacimiento) {
		validarDatosAutor(nombre, fechanacimiento);
		
		Autor autor = new Autor();
		autor.setNombre(nombre.trim());
		autor.setFechanacimiento(fechanacimiento);
		
		DaoAutor dao = new DaoAutorImpl();
		try {
			dao.insertarAutor(autor);
		}catch(Exception ex) {
			throw ex;
		}
	}
	private void validarDatosAutor(String nombre, Date fechanacimiento) {
		if(nombre == null || nombre.trim().isEmpty()) {
			throw new IllegalArgumentException("El nombre del autor es obligatorio");
		}	
	}
}
	