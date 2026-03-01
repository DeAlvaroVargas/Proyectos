package service;

import java.util.List;

import dao.PersistenceManagerSingleton;
import dao.LibroDAO;
import dao.LibroDAOImpl;
import entidades.Libro;
import jakarta.persistence.EntityManager;

public class LibroServiceImpl implements LibroService {

    @Override
    public List<Libro> listarLibros() {

        EntityManager em = null;
        try {
            em = PersistenceManagerSingleton
                    .getInstance()
                    .getEntityManager();

            LibroDAO dao = new LibroDAOImpl(em);
            return dao.findAll();

        } finally {
            if (em != null && em.isOpen()) {
                em.close();
            }
        }
    }

    @Override
    public Libro buscarLibro(String isbn) {

        
        if (isbn == null || isbn.trim().isEmpty()) {
            return null;
        }

        EntityManager em = null;
        try {
            em = PersistenceManagerSingleton
                    .getInstance()
                    .getEntityManager();

            LibroDAO dao = new LibroDAOImpl(em);
            return dao.findById(isbn);

        } finally {
            if (em != null && em.isOpen()) {
                em.close();
            }
        }
    }


}
