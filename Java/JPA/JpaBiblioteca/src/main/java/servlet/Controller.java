package servlet;

import java.io.IOException;
import java.util.List;

import entidades.Libro;
import entidades.Socio;
import entidades.Prestamo;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import service.LibroService;
import service.LibroServiceImpl;
import service.PrestamoService;
import service.PrestamoServiceImpl;
import service.SocioService;
import service.SocioServiceImpl;

@WebServlet({ "/Controller", "/controller" })
public class Controller extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException {

        SocioService socioService = new SocioServiceImpl();
        

        String operacion = request.getParameter("operacion");

        if (operacion == null) {
            operacion = "listadoSocios";
        }

        switch (operacion) {

        case "listadoSocios":
            List<Socio> socios = socioService.listarSocios();
            request.setAttribute("listaSocios", socios);
            request.getRequestDispatcher("listadoSocios.jsp")
                   .forward(request, response);
            break;

        case "buscarSocio":
            String idParam = request.getParameter("id");
            
           
            if (idParam == null || idParam.trim().isEmpty()) {
                request.setAttribute("mensaje", "Debe proporcionar un ID válido");
                request.getRequestDispatcher("buscarSocio.jsp")
                       .forward(request, response);
                break;
            }
            
            try {
                long id = Long.parseLong(idParam);
                Socio socio = socioService.buscarSocio(id);

                if (socio != null) {
                    request.setAttribute("socio", socio);
                } else {
                    request.setAttribute("mensaje",
                            "No existe ningún socio con ese ID");
                }

                request.getRequestDispatcher("buscarSocio.jsp")
                       .forward(request, response);
                       
            } catch (NumberFormatException e) {
                request.setAttribute("mensaje", 
                        "El ID debe ser un número válido");
                request.getRequestDispatcher("buscarSocio.jsp")
                       .forward(request, response);
            }
            break;
            
            
        case "listadoLibros":
        	
        	LibroService libroService = new LibroServiceImpl();
        	List<Libro> libros = libroService.listarLibros();
            request.setAttribute("listaLibros", libros);
            request.getRequestDispatcher("listadoLibros.jsp")
                   .forward(request, response);
            break;

            
        case "buscarLibro":
            String isbn = request.getParameter("id");

            LibroService libroService1 = new LibroServiceImpl();
            Libro libro = libroService1.buscarLibro(isbn);

            if (libro != null) {
                request.setAttribute("libro", libro);
            } else {
                request.setAttribute("mensaje", "ISBN inválido o libro no encontrado");
            }

            request.getRequestDispatcher("buscarLibro.jsp")
                   .forward(request, response);
            break;
            
        case "nuevoPrestamo":

            response.sendRedirect("nuevoPrestamo.jsp");
            break;
            
        case "hacerPrestamo":

            long idEjemplar = Long.parseLong(request.getParameter("idEjemplar"));
            long idSocio = Long.parseLong(request.getParameter("idSocio"));

            PrestamoServiceImpl prestamoService = new PrestamoServiceImpl();

            boolean creado = prestamoService.crearPrestamo(idEjemplar, idSocio);

            if (creado) {
                request.setAttribute("mensaje", "Préstamo creado correctamente");
            } else {
                
                request.setAttribute("mensaje", prestamoService.getUltimoError());
            }

            request.getRequestDispatcher("nuevoPrestamo.jsp")
                   .forward(request, response);
            break;
            
            
        case "listadoPrestamos":
        	PrestamoServiceImpl prestamoService1 = new PrestamoServiceImpl();
            List<Prestamo> prestamos = prestamoService1.listarPrestamos();
            request.setAttribute("listaPrestamos", prestamos );
            request.getRequestDispatcher("listadoPrestamos.jsp")
                   .forward(request, response);
            break;    
            
            
        case "prestamosPorSocio":

            
            request.getRequestDispatcher("prestamosPorSocio.jsp")
                   .forward(request, response);
            break;
            
        case "buscarPrestamosPorSocio":

            String idSocioParam = request.getParameter("idSocio");

            if (idSocioParam == null || idSocioParam.trim().isEmpty()) {
                request.setAttribute("mensaje", "Debe introducir un ID de socio");
                request.getRequestDispatcher("prestamosPorSocio.jsp")
                       .forward(request, response);
                break;
            }

            try {
                long idSocio2 = Long.parseLong(idSocioParam);

                PrestamoService prestamoService3 = new PrestamoServiceImpl();
                List<Prestamo> prestamos1 =
                        prestamoService3.obtenerPrestamosPorSocio(idSocio2);

                request.setAttribute("prestamos", prestamos1);

                request.getRequestDispatcher("prestamosPorSocio.jsp")
                       .forward(request, response);

            } catch (NumberFormatException e) {
                request.setAttribute("mensaje", "El ID debe ser numérico");
                request.getRequestDispatcher("prestamosPorSocio.jsp")
                       .forward(request, response);

            } catch (RuntimeException e) { // 👈 socio no existe
                request.setAttribute("mensaje", e.getMessage());
                request.getRequestDispatcher("prestamosPorSocio.jsp")
                       .forward(request, response);
            }

            break;
            
        case "nuevoSocio":
            request.getRequestDispatcher("nuevoSocio.jsp")
                   .forward(request, response);
            break;
            
            
        case "crearSocio":
            String nombre = request.getParameter("nombre");
            String email = request.getParameter("email");
            
            
            if (nombre == null || nombre.trim().isEmpty()) {
                request.setAttribute("mensaje", "El nombre del socio es obligatorio");
                request.getRequestDispatcher("nuevoSocio.jsp")
                    .forward(request, response);
                break;
            }
            
            
            if (email == null || email.trim().isEmpty()) {
                request.setAttribute("mensaje", "El email del socio es obligatorio");
                request.getRequestDispatcher("nuevoSocio.jsp")
                    .forward(request, response);
                break;
            }
            
            try {
                Socio socio = new Socio();
                socio.setNombre(nombre.trim());
                socio.setEmail(email.trim());
                
                SocioService socioService4 = new SocioServiceImpl();
                socioService4.crearSocio(socio);
                
                
                request.setAttribute("mensajeOk", "Socio creado correctamente");
                request.getRequestDispatcher("nuevoSocio.jsp")
                    .forward(request, response);
                
            } catch (RuntimeException e) {
                e.printStackTrace();
                request.setAttribute("mensaje", "Error: " + e.getMessage());
                request.getRequestDispatcher("nuevoSocio.jsp")
                    .forward(request, response);
            }
            break;






    
        default:
            response.sendRedirect("controller?operacion=listadoSocios");
        }
        
        
        
    }

    @Override
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}
