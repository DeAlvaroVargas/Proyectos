package test;
import dao.DaoSocio;
import dao.DaoSocioImpl;
import dao.PersistenceManagerSingleton;
import entidades.Socio;

public class TestConexion {
	public static void main(String[]args) {
		long codigosocio = 1L;
		DaoSocio dao = new DaoSocioImpl();
		Socio socio = dao.findSocioById(codigosocio);
		
		if(socio != null) {
			
			System.out.println(socio.toString());
		}
		else {
			System.out.println("El socio" + codigosocio + " no funciona");
		}
		PersistenceManagerSingleton.getInstance().closeEntityManagerFactory();
	}
	
}
