package services;


import java.util.List;

import dao.EspecieDAO;
import dao.EspecieDAOImpl;
import entidades.Especie;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class EspecieServiceImpl implements EspecieService{
	private EntityManagerFactory emf;
	
	public EspecieServiceImpl() {
		emf = Persistence.createEntityManagerFactory("pesca");
		
	}
	public List<Especie> listarEspecies(){
		EntityManager em = emf.createEntityManager();
		try {
			EspecieDAO dao = new EspecieDAOImpl(em);
			return dao.findAll();
		}finally {
			em.close();
		}
		
	}
}
