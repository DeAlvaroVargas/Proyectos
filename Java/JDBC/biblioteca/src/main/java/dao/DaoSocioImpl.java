package dao;
import entidades.Socio;
import jakarta.persistence.EntityManager;

public class DaoSocioImpl extends BaseJPADao implements DaoSocio{
	@Override
	public Socio findSocioById(long idsocio) {
		EntityManager em = getEntityManager();
		Socio socio = em.find(Socio.class, idsocio);
		em.close();
		return socio;
		
	}
}
