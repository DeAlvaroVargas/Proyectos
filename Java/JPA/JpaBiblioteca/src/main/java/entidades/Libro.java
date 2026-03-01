package entidades;

import java.io.Serializable;
import jakarta.persistence.*;
import java.util.List;



@Entity
@NamedQuery(name="Libro.findAll", query="SELECT l FROM Libro l")
public class Libro implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String isbn;

	private String titulo;

	
	@OneToMany(mappedBy="libro")
	private List<Ejemplar> ejemplars;

	
	@ManyToOne
	@JoinColumn(name="IDAUTOR")
	private Autor autor;

	public Libro() {
	}

	public String getIsbn() {
		return this.isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public String getTitulo() {
		return this.titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public List<Ejemplar> getEjemplars() {
		return this.ejemplars;
	}

	public void setEjemplars(List<Ejemplar> ejemplars) {
		this.ejemplars = ejemplars;
	}

	public Ejemplar addEjemplar(Ejemplar ejemplar) {
		getEjemplars().add(ejemplar);
		ejemplar.setLibro(this);

		return ejemplar;
	}

	public Ejemplar removeEjemplar(Ejemplar ejemplar) {
		getEjemplars().remove(ejemplar);
		ejemplar.setLibro(null);

		return ejemplar;
	}

	public Autor getAutor() {
		return this.autor;
	}

	public void setAutor(Autor autor) {
		this.autor = autor;
	}

}