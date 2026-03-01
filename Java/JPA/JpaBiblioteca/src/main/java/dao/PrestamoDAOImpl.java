package dao;

import java.util.List;

import entidades.Prestamo;
import entidades.Socio;
import jakarta.persistence.EntityManager;

public class PrestamoDAOImpl implements PrestamoDAO {

    private EntityManager em;

    public PrestamoDAOImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public void crear(Prestamo prestamo) {
        em.persist(prestamo);
    }
    
    @Override
    public List<Prestamo> findAll() {
        return em.createNamedQuery(
                "Prestamo.findAll",
                Prestamo.class
        ).getResultList();
    }
    
    @Override
    public List<Prestamo> buscarPorSocio(long idSocio) {

        
        Socio socio = em.find(Socio.class, idSocio);

        
        return em.createQuery(
            "SELECT p FROM Prestamo p WHERE p.socio = :socio",
            Prestamo.class
        )
        .setParameter("socio", socio) 
        .getResultList();
    }


    
}

