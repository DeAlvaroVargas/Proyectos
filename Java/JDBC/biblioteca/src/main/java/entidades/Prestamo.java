package entidades;

import java.io.Serializable;
import jakarta.persistence.*;
import java.sql.Timestamp;


/**
 * The persistent class for the PRESTAMO database table.
 * 
 */
@Entity
@NamedQuery(name="Prestamo.findAll", query="SELECT p FROM Prestamo p")
public class Prestamo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(insertable = false, updatable = false )
	private long idejemplar;

	private Timestamp fechalimitedevolucion;

	private Timestamp fechaprestamo;

	//uni-directional one-to-one association to Ejemplar
	@OneToOne
	@JoinColumn(name="IDEJEMPLAR")
	private Ejemplar ejemplar;

	//bi-directional many-to-one association to Socio
	@ManyToOne
	@JoinColumn(name="IDSOCIO")
	private Socio socio;

	public Prestamo() {
	}

	public long getIdejemplar() {
		return this.idejemplar;
	}

	public void setIdejemplar(long idejemplar) {
		this.idejemplar = idejemplar;
	}

	public Timestamp getFechalimitedevolucion() {
		return this.fechalimitedevolucion;
	}

	public void setFechalimitedevolucion(Timestamp fechalimitedevolucion) {
		this.fechalimitedevolucion = fechalimitedevolucion;
	}

	public Timestamp getFechaprestamo() {
		return this.fechaprestamo;
	}

	public void setFechaprestamo(Timestamp fechaprestamo) {
		this.fechaprestamo = fechaprestamo;
	}

	public Ejemplar getEjemplar() {
		return this.ejemplar;
	}

	public void setEjemplar(Ejemplar ejemplar) {
		this.ejemplar = ejemplar;
	}

	public Socio getSocio() {
		return this.socio;
	}

	public void setSocio(Socio socio) {
		this.socio = socio;
	}

}