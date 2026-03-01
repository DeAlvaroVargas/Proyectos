package dao;

import java.util.List;

import entidades.Autor;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

public class DaoAutorImpl extends BaseJPADao implements DaoAutor{

	@Override
	public List<Autor> listadoAutores() {
		
		// TODO Auto-generated method stub
		//tiped query es una consulta tipada que para todas las entidades el asistente genera
		//un find all que hace una consulta
		
		EntityManager em = getEntityManager();
		TypedQuery<Autor>consulta = em.createNamedQuery("Autor.findAll", Autor.class);
		List<Autor> autores = consulta.getResultList();
		
		//este for no es necesario el refresh solo vuelve a la base de datos a coger de nuevo los datos
//		for(Autor autor : autores) {
//			em.refresh(autor);
//		}
		
		em.close();
		return autores;

	}
	public void insertarAutor(Autor autor) {
		
		EntityManager em = getEntityManager();
		try {
			em.getTransaction().begin();
			em.persist(autor);
			em.getTransaction().commit();
			
		}catch(Exception ex) {
			if(em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			throw ex;
		}finally {
			em.close();
		}
	}
}