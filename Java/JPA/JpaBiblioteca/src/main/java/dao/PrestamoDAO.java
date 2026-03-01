package dao;

import java.util.List;

import entidades.Prestamo;

public interface PrestamoDAO {
    void crear(Prestamo prestamo);
    
    List<Prestamo> findAll();
    List<Prestamo> buscarPorSocio(long idSocio);
}
