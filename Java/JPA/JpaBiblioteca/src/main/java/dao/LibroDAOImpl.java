package dao;

import java.util.List;
import entidades.Libro;
import jakarta.persistence.EntityManager;

public class LibroDAOImpl implements LibroDAO{
	
	private final EntityManager em;

    public LibroDAOImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<Libro> findAll() {
        return em.createNamedQuery(
                "Libro.findAll",
                Libro.class
        ).getResultList();
    }

    @Override
    public Libro findById(String isbn) {
        return em.find(Libro.class, isbn);
    }
}

