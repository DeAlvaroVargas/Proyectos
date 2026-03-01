package dao;

import java.util.List;

import entidades.Captura;
import jakarta.persistence.EntityManager;

public class CapturaDAOImpl implements CapturaDAO {

    private EntityManager em;

    public CapturaDAOImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public void create(Captura captura) {
        em.persist(captura);
    }

    @Override
    public List<Captura> findAll() {
        return em.createNamedQuery(
                "Captura.findAll",
                Captura.class
        ).getResultList();
    }
}
