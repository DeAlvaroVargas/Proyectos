package test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class TestConexion {

    public static void main(String[] args) {

        System.out.println("Iniciando prueba de conexión JPA...");

        
        EntityManagerFactory emf =
                Persistence.createEntityManagerFactory("JpaBiblioteca");

        
        EntityManager em = emf.createEntityManager();

        
        System.out.println("✅ Conexión realizada correctamente");

        
        em.close();
        emf.close();

        System.out.println("Fin de la prueba");
    }
}
