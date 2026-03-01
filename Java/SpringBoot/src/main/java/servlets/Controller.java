package servlets;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import entidades.Autor;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import services.ServicioAutor;
import services.ServicioAutorImpl;

@WebServlet("/controller")
public class Controller extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String operacion = request.getParameter("operacion");
        switch (operacion != null ? operacion : "") {
            case "listarAutores":
                ServicioAutor servicio = new ServicioAutorImpl();
                List<Autor> autores = servicio.listadoAutores();
                
                request.setAttribute("listadoAutores", autores);
                request.setAttribute("operacion", operacion);
                request.getRequestDispatcher("/WEB-INF/listadoAutores.jsp").forward(request, response);
                break;
                
            case "altaAutor":
                // Si viene del formulario (con datos)
                String nombre = request.getParameter("nombreAutor");
                String fechaStr = request.getParameter("fechaNacimiento");
                
                if (nombre != null && fechaStr != null) {
                    // Procesar el alta
                    try {
                        SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd");
                        Date fechanacimiento = formato.parse(fechaStr);
                        
                        ServicioAutor servicioAutor = new ServicioAutorImpl();
                        servicioAutor.insertarAutor(nombre, fechanacimiento);
                        
                        // Redirigir al listado
                        response.sendRedirect("controller?operacion=listarAutores");
                        
                    } catch (ParseException e) {
                        request.setAttribute("error", "Formato de fecha incorrecto");
                        request.getRequestDispatcher("/WEB-INF/altaAutor.jsp").forward(request, response);
                        
                    } catch (IllegalArgumentException e) {
                        request.setAttribute("error", e.getMessage());
                        request.getRequestDispatcher("/WEB-INF/altaAutor.jsp").forward(request, response);
                        
                    } catch (Exception e) {
                        request.setAttribute("error", "Error al dar de alta el autor: " + e.getMessage());
                        request.getRequestDispatcher("/WEB-INF/altaAutor.jsp").forward(request, response);
                    }
                } else {
                    // Mostrar el formulario vacío
                    request.getRequestDispatcher("/WEB-INF/altaAutor.jsp").forward(request, response);
                }
                break;
                
            default:
                break;
        }
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}