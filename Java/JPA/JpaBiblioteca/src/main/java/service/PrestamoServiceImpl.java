package service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import dao.PersistenceManagerSingleton;
import dao.PrestamoDAO;
import dao.PrestamoDAOImpl;
import entidades.Ejemplar;
import entidades.Prestamo;
import entidades.Socio;
import jakarta.persistence.EntityManager;

public class PrestamoServiceImpl implements PrestamoService {

    private String ultimoError;

    public String getUltimoError() {
        return ultimoError;
    }

    @Override
    public boolean existeSocio(long idSocio) {

        EntityManager em = null;
        try {
            em = PersistenceManagerSingleton
                    .getInstance()
                    .getEntityManager();

            Socio socio = em.find(Socio.class, idSocio);
            return socio != null;

        } finally {
            if (em != null) em.close();
        }
    }

    @Override
    public boolean existeEjemplar(long idEjemplar) {

        EntityManager em = null;
        try {
            em = PersistenceManagerSingleton
                    .getInstance()
                    .getEntityManager();

            Ejemplar ejemplar = em.find(Ejemplar.class, idEjemplar);
            return ejemplar != null;

        } finally {
            if (em != null) em.close();
        }
    }

    @Override
    public boolean crearPrestamo(long idEjemplar, long idSocio) {

        EntityManager em = null;
        ultimoError = null;

        try {
            em = PersistenceManagerSingleton
                    .getInstance()
                    .getEntityManager();

            
            Socio socio = em.find(Socio.class, idSocio);
            if (socio == null) {
                ultimoError = "El socio no existe";
                return false;
            }

          
            Ejemplar ejemplar = em.find(Ejemplar.class, idEjemplar);
            if (ejemplar == null) {
                ultimoError = "El ejemplar no existe";
                return false;
            }

            
            Long yaPrestado = em.createQuery(
                "SELECT COUNT(p) FROM Prestamo p WHERE p.ejemplar.idejemplar = :id",
                Long.class)
                .setParameter("id", idEjemplar)
                .getSingleResult();

            if (yaPrestado > 0) {
                ultimoError = "El ejemplar ya está prestado";
                return false;
            }

            
            Prestamo prestamo = new Prestamo();
            prestamo.setSocio(socio);
            prestamo.setEjemplar(ejemplar);
            prestamo.setFechaprestamo(new Date());

            Date fechaLimite = Date.from(
                LocalDate.now().plusDays(30)
                .atStartOfDay(ZoneId.systemDefault())
                .toInstant());

            prestamo.setFechalimitedevolucion(fechaLimite);

            
            em.getTransaction().begin();
            em.persist(prestamo);
            em.getTransaction().commit();

            return true;

        } catch (Exception e) {

            if (em != null && em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }

            
            String mensaje = e.getCause() != null
                    ? e.getCause().getMessage()
                    : e.getMessage();

            if (mensaje != null && mensaje.contains("ORA-00001")) {
                ultimoError = "El ejemplar ya está prestado";
            } else {
                ultimoError = "Error al crear el préstamo";
            }

            return false;

        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

	@Override
	public List<Prestamo> listarPrestamos() {
		EntityManager em = null;
        try {
            em = PersistenceManagerSingleton
                    .getInstance()
                    .getEntityManager();

            PrestamoDAO dao = new PrestamoDAOImpl(em);
            return dao.findAll();

        } finally {
            if (em != null && em.isOpen()) {
                em.close();
            }
        }
	}
	
	
	@Override
	public List<Prestamo> obtenerPrestamosPorSocio(long idSocio) {

	    EntityManager em = null;

	    try {
	        em = PersistenceManagerSingleton
	                .getInstance()
	                .getEntityManager();

	        
	        Socio socio = em.find(Socio.class, idSocio);

	        if (socio == null) {
	            throw new RuntimeException("El socio con id " + idSocio + " no existe");
	        }

	        
	        PrestamoDAO dao = new PrestamoDAOImpl(em);
	        return dao.buscarPorSocio(idSocio);

	    } finally {
	        if (em != null) {
	            em.close();
	        }
	    }
	}



}
