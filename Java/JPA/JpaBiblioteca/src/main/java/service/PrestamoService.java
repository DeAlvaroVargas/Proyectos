package service;

import java.util.List;

import entidades.Prestamo;

public interface PrestamoService {

    boolean existeSocio(long idSocio);

    boolean existeEjemplar(long idEjemplar);

    boolean crearPrestamo(long idEjemplar, long idSocio);
    
    List<Prestamo> listarPrestamos();
    
    List<Prestamo> obtenerPrestamosPorSocio(long idSocio);


}
