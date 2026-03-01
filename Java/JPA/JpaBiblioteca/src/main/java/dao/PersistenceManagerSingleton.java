package dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class PersistenceManagerSingleton {
    
    public static final boolean DEBUG = true;
    private static final String UNIDAD_PERSISTENCIA = "JpaBiblioteca";
    
    private static PersistenceManagerSingleton instance = null;
    private EntityManagerFactory emf = null;

    
    private PersistenceManagerSingleton() {
    }

    public static synchronized PersistenceManagerSingleton getInstance() {
        if (instance == null) {
            instance = new PersistenceManagerSingleton();
        }
        return instance;
    }

    
    public synchronized EntityManager getEntityManager() {
        
        if (emf == null) {
            emf = Persistence.createEntityManagerFactory(UNIDAD_PERSISTENCIA);
            if (DEBUG) {
                System.out.println(" Persistencia Inicializada " + new java.util.Date());
            }
        }
        return emf.createEntityManager();
    }

    public synchronized void closeEntityManagerFactory() {
        if (emf != null) {
            emf.close();
            emf = null;
            if (DEBUG) {
                System.out.println(" Persistencia Finalizada " + new java.util.Date());
            }
        }
    }
}
