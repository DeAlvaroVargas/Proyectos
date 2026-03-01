package entidades;

import java.io.Serializable;
import jakarta.persistence.*;
import java.util.List;


/**
 * The persistent class for the SOCIO database table.
 * 
 */
@Entity
@NamedQuery(name="Socio.findAll", query="SELECT s FROM Socio s")
public class Socio implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="SOCIO_IDSOCIO_GENERATOR", sequenceName="S_SOCIO")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SOCIO_IDSOCIO_GENERATOR")
	private long idsocio;

	private String direccion;

	private String email;

	private String nombre;

	@Column(name="\"VERSION\"")
	private int version;

	//bi-directional many-to-one association to Prestamo
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

	public int getVersion() {
		return this.version;
	}

	public void setVersion(int version) {
		this.version = version;
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

	@Override
	public String toString() {
		return "Socio [idsocio=" + idsocio + ", direccion=" + direccion + ", email=" + email + ", nombre=" + nombre
				+ ", version=" + version + "]";
	}
	

}