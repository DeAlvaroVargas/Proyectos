package dao;
import entidades.Especie;
import java.util.List;
import jakarta.persistence.EntityManager;
public class EspecieDAOImpl implements EspecieDAO {
	
	private EntityManager em;
	
	public EspecieDAOImpl(EntityManager em) {
		this.em = em;
	}
	public List<Especie> findAll() {
        return em.createQuery(
                "SELECT e FROM Especie e",
                Especie.class
        ).getResultList();
    }
}