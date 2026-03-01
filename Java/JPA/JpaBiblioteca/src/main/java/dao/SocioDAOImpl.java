package dao;

import java.util.List;
import entidades.Socio;
import jakarta.persistence.EntityManager;

public class SocioDAOImpl implements SocioDAO {

    private final EntityManager em;

    public SocioDAOImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<Socio> findAll() {
        return em.createNamedQuery(
                "Socio.findAll",
                Socio.class
        ).getResultList();
    }

    @Override
    public Socio findById(long id) {
        return em.find(Socio.class, id);
    }
    
    @Override
    public void insertar(Socio socio) {
        em.persist(socio);
    }
}
