package excepciones;

public class BibliotecaException extends Exception {
	private static final long serialVersionUID = 1L;

	public BibliotecaException() {
		super();
	}

	public BibliotecaException(String message) {
		super(message);
	}

	public BibliotecaException(String message, Throwable cause) {
		super(message, cause);
	}
}