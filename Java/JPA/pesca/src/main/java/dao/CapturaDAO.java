package dao;

import java.util.List;
import entidades.Captura;

public interface CapturaDAO {

    void create(Captura captura);

    List<Captura> findAll();
}
