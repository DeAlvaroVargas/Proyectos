package entidades;

import java.io.Serializable;
import jakarta.persistence.*;
import java.util.Date;


@Entity
@NamedQuery(name = "Prestamo.findAll", query = "SELECT p FROM Prestamo p")
public class Prestamo implements Serializable {

    private static final long serialVersionUID = 1L;

    
    @Id
    @Column(name = "IDEJEMPLAR", insertable = false, updatable = false)
    private long idejemplar;

    @Temporal(TemporalType.DATE)
    private Date fechalimitedevolucion;

    @Temporal(TemporalType.DATE)
    private Date fechaprestamo;

   
    @OneToOne
    @JoinColumn(name = "IDEJEMPLAR")
    private Ejemplar ejemplar;

    
    @ManyToOne
    @JoinColumn(name = "IDSOCIO")
    private Socio socio;

    public Prestamo() {
    }

    public long getIdejemplar() {
        return idejemplar;
    }

    public void setIdejemplar(long idejemplar) {
        this.idejemplar = idejemplar;
    }

    public Date getFechalimitedevolucion() {
        return fechalimitedevolucion;
    }

    public void setFechalimitedevolucion(Date fechalimitedevolucion) {
        this.fechalimitedevolucion = fechalimitedevolucion;
    }

    public Date getFechaprestamo() {
        return fechaprestamo;
    }

    public void setFechaprestamo(Date fechaprestamo) {
        this.fechaprestamo = fechaprestamo;
    }

    public Ejemplar getEjemplar() {
        return ejemplar;
    }

    public void setEjemplar(Ejemplar ejemplar) {
        this.ejemplar = ejemplar;
    }

    public Socio getSocio() {
        return socio;
    }

    public void setSocio(Socio socio) {
        this.socio = socio;
    }
}
