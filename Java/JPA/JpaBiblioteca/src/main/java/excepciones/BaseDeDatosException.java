package excepciones;

public class BaseDeDatosException extends Exception {
	private static final long serialVersionUID = 1L;

	public BaseDeDatosException() {
		super();
	}

	public BaseDeDatosException(String message) {
		super(message);
	}

	public BaseDeDatosException(String message, Throwable cause) {
		super(message, cause);
	}

}
