package entidades;

import java.io.Serializable;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;


@Entity
@NamedQuery(name="Socio.findAll", query="SELECT s FROM Socio s")
public class Socio implements Serializable {
    private static final long serialVersionUID = 1L;

   
    @Id
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,     
        generator = "SOCIO_GEN"                   
    )
    @SequenceGenerator(
        name = "SOCIO_GEN",                       
        sequenceName = "S_SOCIO",                 
        allocationSize = 1                        
    )
    @Column(name = "IDSOCIO")
    private long idsocio;

    private String direccion;

    private String email;

    private String nombre;

    @Column(name="\"VERSION\"")
    private BigDecimal version;

    
    @OneToMany(mappedBy="socio")
    private List<Devolucion> devolucions;

    
    @OneToMany(mappedBy="socio")
    private List<Prestamo> prestamos;

    public Socio() {
    }

    public long getIdsocio() {
        return this.idsocio;
    }

    
    public void setIdsocio(long idsocio) {
        this.idsocio = idsocio;
    }

    public String getDireccion() {
        return this.direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNombre() {
        return this.nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public BigDecimal getVersion() {
        return this.version;
    }

    public void setVersion(BigDecimal version) {
        this.version = version;
    }

    public List<Devolucion> getDevolucions() {
        return this.devolucions;
    }

    public void setDevolucions(List<Devolucion> devolucions) {
        this.devolucions = devolucions;
    }

    public Devolucion addDevolucion(Devolucion devolucion) {
        getDevolucions().add(devolucion);
        devolucion.setSocio(this);
        return devolucion;
    }

    public Devolucion removeDevolucion(Devolucion devolucion) {
        getDevolucions().remove(devolucion);
        devolucion.setSocio(null);
        return devolucion;
    }

    public List<Prestamo> getPrestamos() {
        return this.prestamos;
    }

    public void setPrestamos(List<Prestamo> prestamos) {
        this.prestamos = prestamos;
    }

    public Prestamo addPrestamo(Prestamo prestamo) {
        getPrestamos().add(prestamo);
        prestamo.setSocio(this);
        return prestamo;
    }

    public Prestamo removePrestamo(Prestamo prestamo) {
        getPrestamos().remove(prestamo);
        prestamo.setSocio(null);
        return prestamo;
    }
}
