package test;

import java.util.List;

import entidades.Libro;
//import entidades.Socio;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;

public class TestQuery {
	public static void main (String[]args) {
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("biblioteca");
		EntityManager em = emf.createEntityManager();
		//String consulta = 	"SELECT DISTINCT p.socio " +
	          //    			"FROM Prestamo p " +   // espacio al final
	         //     			"WHERE p.fechalimitedevolucion < CURRENT_DATE"; // espacio antes de <
		//TypedQuery<Socio>query = em.createQuery(consulta, Socio.class);
		
		
		
		//String consulta = 	"select l " +
							//"from Libro l " +
			//				"where l.autor.nombre = 'LORENZO SILVA'";
		//TypedQuery<Libro>query = em.createQuery(consulta, Libro.class);
		
		
		String consulta =	"select distinct p.ejemplar.libro " + 
				 			"from Prestamo p " + 
				 			"where p.ejemplar.libro.autor.nombre='LORENZO SILVA'";
		TypedQuery<Libro>query = em.createQuery(consulta, Libro.class);
		List<Libro> listarLibro = query.getResultList();
		for(Libro l:listarLibro) {
			System.out.println(l.getTitulo());
		}
		em.close();
		emf.close();
	}
}
