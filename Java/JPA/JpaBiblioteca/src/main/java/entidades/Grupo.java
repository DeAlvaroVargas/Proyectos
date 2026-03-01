package entidades;

import java.io.Serializable;
import jakarta.persistence.*;



@Entity
@Table(name="GRUPOS")
@NamedQuery(name="Grupo.findAll", query="SELECT g FROM Grupo g")
public class Grupo implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private GrupoPK id;

	
	@ManyToOne
	@JoinColumn(name="IDUSUARIO")
	private Usuario usuario;

	public Grupo() {
	}

	public GrupoPK getId() {
		return this.id;
	}

	public void setId(GrupoPK id) {
		this.id = id;
	}

	public Usuario getUsuario() {
		return this.usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

}