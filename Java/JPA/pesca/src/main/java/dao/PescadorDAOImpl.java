package dao;

import java.util.List;

import entidades.Pescador;
import jakarta.persistence.EntityManager;

public class PescadorDAOImpl implements PescadorDAO {

    private EntityManager em;

    public PescadorDAOImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<Pescador> findAll() {
        return em.createQuery(
                "SELECT p FROM Pescador p",
                Pescador.class
        ).getResultList();
    }
    @Override
    
    public void create(Pescador pescador) {
        em.persist(pescador);
    }
    @Override
    public Pescador findUltimo() {
        try {
            return em.createQuery(
                    "SELECT p FROM Pescador p ORDER BY p.idPescador DESC",
                    Pescador.class
            )
            .setMaxResults(1)
            .getSingleResult();
        } catch (Exception e) {
            return null; // no hay pescadores
        }
    }
}
