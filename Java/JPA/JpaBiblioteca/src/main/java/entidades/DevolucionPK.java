package entidades;

import java.io.Serializable;
import jakarta.persistence.*;


@Embeddable
public class DevolucionPK implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Column(insertable=false, updatable=false)
	private long idsocio;

	@Column(insertable=false, updatable=false)
	private long idejemplar;

	@Temporal(TemporalType.DATE)
	private java.util.Date fechaprestamo;

	public DevolucionPK() {
	}
	public long getIdsocio() {
		return this.idsocio;
	}
	public void setIdsocio(long idsocio) {
		this.idsocio = idsocio;
	}
	public long getIdejemplar() {
		return this.idejemplar;
	}
	public void setIdejemplar(long idejemplar) {
		this.idejemplar = idejemplar;
	}
	public java.util.Date getFechaprestamo() {
		return this.fechaprestamo;
	}
	public void setFechaprestamo(java.util.Date fechaprestamo) {
		this.fechaprestamo = fechaprestamo;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof DevolucionPK)) {
			return false;
		}
		DevolucionPK castOther = (DevolucionPK)other;
		return 
			(this.idsocio == castOther.idsocio)
			&& (this.idejemplar == castOther.idejemplar)
			&& this.fechaprestamo.equals(castOther.fechaprestamo);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + ((int) (this.idsocio ^ (this.idsocio >>> 32)));
		hash = hash * prime + ((int) (this.idejemplar ^ (this.idejemplar >>> 32)));
		hash = hash * prime + this.fechaprestamo.hashCode();
		
		return hash;
	}
}