package services;

import java.util.List;
import entidades.Pescador;

public interface PescadorService {

    List<Pescador> listarPescadores();
    
    void nuevoPescador(String nombre, String password);
}
