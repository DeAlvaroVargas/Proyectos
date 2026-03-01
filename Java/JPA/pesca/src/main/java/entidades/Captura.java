package entidades;

import java.io.Serializable;
import jakarta.persistence.*;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the CAPTURA database table.
 * 
 */
@Entity
@NamedQuery(name="Captura.findAll", query="SELECT c FROM Captura c")
public class Captura implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="ID_CAPTURA")
	private long idCaptura;

	@Temporal(TemporalType.DATE)
	private Date fecha;

	//bi-directional many-to-one association to Pescador
	@ManyToOne
	@JoinColumn(name="ID_PESCADOR")
	private Pescador pescador;

	//bi-directional many-to-many association to Especie
	@ManyToMany
	@JoinTable(
		name="CAPTURA_ESPECIE"
		, joinColumns={
			@JoinColumn(name="ID_CAPTURA")
			}
		, inverseJoinColumns={
			@JoinColumn(name="ID_ESPECIE")
			}
		)
	private List<Especie> especies;

	public Captura() {
	}

	public long getIdCaptura() {
		return this.idCaptura;
	}

	public void setIdCaptura(long idCaptura) {
		this.idCaptura = idCaptura;
	}

	public Date getFecha() {
		return this.fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public Pescador getPescador() {
		return this.pescador;
	}

	public void setPescador(Pescador pescador) {
		this.pescador = pescador;
	}

	public List<Especie> getEspecies() {
		return this.especies;
	}

	public void setEspecies(List<Especie> especies) {
		this.especies = especies;
	}

}