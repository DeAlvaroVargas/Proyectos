package entidades;

import java.io.Serializable;
import jakarta.persistence.*;
import java.sql.Timestamp;


/**
 * The persistent class for the SOCIOPENALIZADO database table.
 * 
 */
@Entity
@NamedQuery(name="Sociopenalizado.findAll", query="SELECT s FROM Sociopenalizado s")
public class Sociopenalizado implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private long idsocio;

	private Timestamp limitepenalizacion;

	//uni-directional one-to-one association to Socio
	@OneToOne
	@JoinColumn(name="IDSOCIO", insertable = false, updatable = false)
	private Socio socio;

	public Sociopenalizado() {
	}

	public long getIdsocio() {
		return this.idsocio;
	}

	public void setIdsocio(long idsocio) {
		this.idsocio = idsocio;
	}

	public Timestamp getLimitepenalizacion() {
		return this.limitepenalizacion;
	}

	public void setLimitepenalizacion(Timestamp limitepenalizacion) {
		this.limitepenalizacion = limitepenalizacion;
	}

	public Socio getSocio() {
		return this.socio;
	}

	public void setSocio(Socio socio) {
		this.socio = socio;
	}

}