package entidades;

import java.io.Serializable;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;


/**
 * The persistent class for the ESPECIE database table.
 * 
 */
@Entity
@NamedQuery(name="Especie.findAll", query="SELECT e FROM Especie e")
public class Especie implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="ID_ESPECIE")
	private long idEspecie;

	private String nombre;

	@Column(name="NUM_CAPTURAS")
	private BigDecimal numCapturas;

	//bi-directional many-to-many association to Captura
	@ManyToMany(mappedBy="especies")
	private List<Captura> capturas;

	public Especie() {
	}

	public long getIdEspecie() {
		return this.idEspecie;
	}

	public void setIdEspecie(long idEspecie) {
		this.idEspecie = idEspecie;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public BigDecimal getNumCapturas() {
		return this.numCapturas;
	}

	public void setNumCapturas(BigDecimal numCapturas) {
		this.numCapturas = numCapturas;
	}
	public List<Captura> getCapturas() {
		return this.capturas;
	}

	public void setCapturas(List<Captura> capturas) {
		this.capturas = capturas;
	}

}