package dao;

import java.util.List;
import entidades.Libro;

public interface LibroDAO {

    List<Libro> findAll();

    Libro findById(String isbn);
}
