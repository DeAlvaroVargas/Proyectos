package entidades;

import java.io.Serializable;
import jakarta.persistence.*;
import java.util.List;


/**
 * The persistent class for the PESCADOR database table.
 * 
 */
@Entity
@NamedQuery(name="Pescador.findAll", query="SELECT p FROM Pescador p")
public class Pescador implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="ID_PESCADOR")
	private long idPescador;

	private String codigo;

	private String nombre;

	private String password;

	//bi-directional many-to-one association to Captura
	@OneToMany(mappedBy="pescador")
	private List<Captura> capturas;

	public Pescador() {
	}

	public long getIdPescador() {
		return this.idPescador;
	}

	public void setIdPescador(long idPescador) {
		this.idPescador = idPescador;
	}

	public String getCodigo() {
		return this.codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Captura> getCapturas() {
		return this.capturas;
	}

	public void setCapturas(List<Captura> capturas) {
		this.capturas = capturas;
	}

	public Captura addCaptura(Captura captura) {
		getCapturas().add(captura);
		captura.setPescador(this);

		return captura;
	}

	public Captura removeCaptura(Captura captura) {
		getCapturas().remove(captura);
		captura.setPescador(null);

		return captura;
	}

}