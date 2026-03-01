package service;

import java.util.List;

import dao.PersistenceManagerSingleton;
import dao.SocioDAO;
import dao.SocioDAOImpl;
import entidades.Socio;
import jakarta.persistence.EntityManager;

public class SocioServiceImpl implements SocioService {

    @Override
    public List<Socio> listarSocios() {

        EntityManager em = null;
        try {
            em = PersistenceManagerSingleton
                    .getInstance()
                    .getEntityManager();

            SocioDAO dao = new SocioDAOImpl(em);
            return dao.findAll();

        } finally {
            if (em != null && em.isOpen()) {
                em.close();
            }
        }
    }

    @Override
    public Socio buscarSocio(long id) {

        EntityManager em = null;
        try {
            em = PersistenceManagerSingleton
                    .getInstance()
                    .getEntityManager();

            SocioDAO dao = new SocioDAOImpl(em);
            return dao.findById(id);

        } finally {
            if (em != null && em.isOpen()) {
                em.close();
            }
        }
    }
    
    @Override
    public void crearSocio(Socio socio) {

        EntityManager em = null;

        try {
            em = PersistenceManagerSingleton
                    .getInstance()
                    .getEntityManager();

            em.getTransaction().begin();

            SocioDAO dao = new SocioDAOImpl(em);
            dao.insertar(socio);

            em.getTransaction().commit();

        } catch (Exception e) {
            if (em != null && em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            throw new RuntimeException("Error al crear el socio");
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }
}

