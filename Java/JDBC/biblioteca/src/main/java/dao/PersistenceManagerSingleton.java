package dao;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
public class PersistenceManagerSingleton {
public static final boolean DEBUG = true;
private static final String UNIDAD_PERSISTENCIA = "biblioteca";
private static PersistenceManagerSingleton instance = null;
private EntityManagerFactory emf;

public static PersistenceManagerSingleton getInstance() {
if (instance==null)
instance=new PersistenceManagerSingleton();
return instance;
}
private PersistenceManagerSingleton() {
}
public EntityManagerFactory getEntityManagerFactory() {
if (emf == null) {
emf = Persistence.createEntityManagerFactory(UNIDAD_PERSISTENCIA);
if (DEBUG)
System.out.println( "*** Persistencia Inicializada *** " + new
java.util.Date());
}
return emf;
}
public void closeEntityManagerFactory() {
if (emf != null) {
emf.close();
emf = null;
if (DEBUG)
System.out.println( "*** Persistencia Finalizada *** " +
new java.util.Date());

}
else {
System.out.println("Entity Manager Factory es nulo");
	}
}
}