package dao;

import java.util.List;
import entidades.Pescador;

public interface PescadorDAO {

	    List<Pescador> findAll();

	    Pescador findUltimo();

	    void create(Pescador pescador);
}
