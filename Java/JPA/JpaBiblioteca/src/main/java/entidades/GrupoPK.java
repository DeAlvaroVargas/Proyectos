package entidades;

import java.io.Serializable;
import jakarta.persistence.*;


@Embeddable
public class GrupoPK implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private String idgrupo;

	@Column(insertable=false, updatable=false)
	private String idusuario;

	public GrupoPK() {
	}
	public String getIdgrupo() {
		return this.idgrupo;
	}
	public void setIdgrupo(String idgrupo) {
		this.idgrupo = idgrupo;
	}
	public String getIdusuario() {
		return this.idusuario;
	}
	public void setIdusuario(String idusuario) {
		this.idusuario = idusuario;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof GrupoPK)) {
			return false;
		}
		GrupoPK castOther = (GrupoPK)other;
		return 
			this.idgrupo.equals(castOther.idgrupo)
			&& this.idusuario.equals(castOther.idusuario);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.idgrupo.hashCode();
		hash = hash * prime + this.idusuario.hashCode();
		
		return hash;
	}
}