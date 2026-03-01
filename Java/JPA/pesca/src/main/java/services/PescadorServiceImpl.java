package services;

import java.util.List;

import dao.PescadorDAO;
import dao.PescadorDAOImpl;
import entidades.Pescador;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class PescadorServiceImpl implements PescadorService {

    private EntityManagerFactory emf;

    public PescadorServiceImpl() {
        emf = Persistence.createEntityManagerFactory("pesca");
    }

    @Override
    public List<Pescador> listarPescadores() {

        EntityManager em = emf.createEntityManager();

        try {
            PescadorDAO dao = new PescadorDAOImpl(em);
            return dao.findAll();
        } finally {
            em.close();
        }
    }
    @Override
    public void nuevoPescador(String nombre, String password) {

        if (nombre == null || nombre.trim().isEmpty()) {
            throw new RuntimeException("El nombre es obligatorio");
        }

        if (password == null || password.trim().isEmpty()) {
            throw new RuntimeException("La contraseña es obligatoria");
        }

        EntityManager em = emf.createEntityManager();

        try {
            PescadorDAO dao = new PescadorDAOImpl(em);

            // 🔹 Obtener último pescador
            Pescador ultimo = dao.findUltimo();

            long nuevoId = 1;
            if (ultimo != null) {
                nuevoId = ultimo.getIdPescador() + 1;
            }

            // 🔹 Generar código PESC001, PESC002...
            String codigo = String.format("PESC%03d", nuevoId);

            Pescador p = new Pescador();
            p.setIdPescador(nuevoId);
            p.setCodigo(codigo);
            p.setNombre(nombre);
            p.setPassword(password);

            em.getTransaction().begin();
            dao.create(p);
            em.getTransaction().commit();

        } catch (RuntimeException e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            throw e;
        } finally {
            em.close();
        }
    }

}
