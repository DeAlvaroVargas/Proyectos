package entidades;

import java.io.Serializable;
import jakarta.persistence.*;
import java.util.Date;


@Entity
@NamedQuery(name = "Sociopenalizado.findAll", query = "SELECT s FROM Sociopenalizado s")
public class Sociopenalizado implements Serializable {

    private static final long serialVersionUID = 1L;

    
    @Id
    @Column(name = "IDSOCIO", insertable = false, updatable = false)
    private long idsocio;

    @Temporal(TemporalType.DATE)
    private Date limitepenalizacion;

    
    @OneToOne
    @JoinColumn(name = "IDSOCIO")
    private Socio socio;

    public Sociopenalizado() {
    }

    public long getIdsocio() {
        return idsocio;
    }

    public void setIdsocio(long idsocio) {
        this.idsocio = idsocio;
    }

    public Date getLimitepenalizacion() {
        return limitepenalizacion;
    }

    public void setLimitepenalizacion(Date limitepenalizacion) {
        this.limitepenalizacion = limitepenalizacion;
    }

    public Socio getSocio() {
        return socio;
    }

    public void setSocio(Socio socio) {
        this.socio = socio;
    }
}
