package dao;
	import entidades.Autor;
	import java.util.List;
	
public interface DaoAutor {
		List<Autor>listadoAutores();
		void insertarAutor(Autor autor);
	}


