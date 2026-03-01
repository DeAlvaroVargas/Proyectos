package service;

import java.util.List;
import entidades.Socio;

public interface SocioService {

    List<Socio> listarSocios();

    Socio buscarSocio(long id);
    
    void crearSocio(Socio socio);
    
    
}
