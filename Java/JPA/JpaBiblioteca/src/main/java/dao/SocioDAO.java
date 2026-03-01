package dao;

import java.util.List;
import entidades.Socio;

public interface SocioDAO {

    List<Socio> findAll();

    Socio findById(long id);
    
    void insertar(Socio socio);
}
