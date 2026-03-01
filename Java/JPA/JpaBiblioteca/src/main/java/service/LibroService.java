package service;

import java.util.List;
import entidades.Libro;

public interface LibroService {

    List<Libro> listarLibros();

    Libro buscarLibro(String isbn);
}

