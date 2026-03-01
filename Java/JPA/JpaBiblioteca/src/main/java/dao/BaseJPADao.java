package dao;

import jakarta.persistence.EntityManager;

public class BaseJPADao {

    public BaseJPADao() {
    }

    public EntityManager getEntityManager() {
        
        return PersistenceManagerSingleton
                .getInstance()
                .getEntityManager();
    }
}
