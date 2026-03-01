package listeners;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;

@WebListener
public class AppListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {

        // Se ejecuta al arrancar la aplicación
        EntityManagerFactory emf =
                Persistence.createEntityManagerFactory("pesca");

        // Guardamos el EMF en el contexto de la aplicación
        sce.getServletContext().setAttribute("emf", emf);

        System.out.println(">>> EMF creado (pesca)");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {

        EntityManagerFactory emf =
            (EntityManagerFactory) sce.getServletContext()
                                      .getAttribute("emf");

        if (emf != null && emf.isOpen()) {
            emf.close();
        }

        System.out.println(">>> EMF cerrado");
    }
}

