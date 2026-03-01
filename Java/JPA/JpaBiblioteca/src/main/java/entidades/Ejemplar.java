package entidades;

import java.io.Serializable;
import jakarta.persistence.*;



@Entity
@NamedQuery(name="Ejemplar.findAll", query="SELECT e FROM Ejemplar e")
public class Ejemplar implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private long idejemplar;

	private String baja;

	
	@ManyToOne
	@JoinColumn(name="ISBN")
	private Libro libro;

	public Ejemplar() {
	}

	public long getIdejemplar() {
		return this.idejemplar;
	}

	public void setIdejemplar(long idejemplar) {
		this.idejemplar = idejemplar;
	}

	public String getBaja() {
		return this.baja;
	}

	public void setBaja(String baja) {
		this.baja = baja;
	}

	public Libro getLibro() {
		return this.libro;
	}

	public void setLibro(Libro libro) {
		this.libro = libro;
	}

}