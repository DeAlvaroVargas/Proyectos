package dao;

import entidades.Ejemplar;
import jakarta.persistence.EntityManager;

public class EjemplarDAOImpl implements EjemplarDAO {

    private EntityManager em;

    public EjemplarDAOImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public Ejemplar findById(long idEjemplar) {
        return em.find(Ejemplar.class, idEjemplar);
    }
}
