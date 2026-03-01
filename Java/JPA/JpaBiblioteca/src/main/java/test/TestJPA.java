package test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class TestJPA {

    public static void main(String[] args) {

        try {
            EntityManagerFactory emf =
                    Persistence.createEntityManagerFactory("JpaBiblioteca");

            EntityManager em = emf.createEntityManager();

            System.out.println(" JPA conectado correctamente con Oracle");

            em.close();
            emf.close();

        } catch (Exception e) {
            System.out.println(" ERROR al iniciar JPA");
            e.printStackTrace();
        }
    }
}
