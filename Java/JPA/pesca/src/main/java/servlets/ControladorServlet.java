package servlets;

import java.io.IOException;
import java.util.List;

import entidades.Pescador;
import entidades.Especie;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import services.PescadorService;
import services.PescadorServiceImpl;
import services.EspecieService;
import services.EspecieServiceImpl;

@WebServlet({ "/Controlador", "/controlador" })
public class ControladorServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException {

        String operacion = request.getParameter("operacion");

        if (operacion == null) {
            operacion = "listadoPescadores";
        }

        switch (operacion) {

        // =========================
        // LISTADO DE PESCADORES
        // =========================
        case "listadoPescadores":

            PescadorService pescadorService =
                    new PescadorServiceImpl();

            List<Pescador> pescadores =
                    pescadorService.listarPescadores();

            request.setAttribute("pescadores", pescadores);
            request.getRequestDispatcher("listadoPescadores.jsp")
                   .forward(request, response);
            break;

        // =========================
        // LISTADO DE ESPECIES
        // =========================
        case "listadoEspecies":

            EspecieService especieService =
                    new EspecieServiceImpl();

            List<Especie> especies =
                    especieService.listarEspecies();

            request.setAttribute("especies", especies);
            request.getRequestDispatcher("listadoEspecies.jsp")
                   .forward(request, response);
            break;
         // =========================
         // NUEVO PESCADOR
         // =========================
        case "nuevoPescador":
            String nombre = request.getParameter("nombre");
            String password = request.getParameter("password");

            try {
                PescadorService service = new PescadorServiceImpl();
                service.nuevoPescador(nombre, password);

                request.setAttribute("mensajeOk",
                        "Pescador creado correctamente");

            } catch (RuntimeException e) {
                request.setAttribute("mensaje", e.getMessage());
            }

            request.getRequestDispatcher("nuevoPescador.jsp")
                   .forward(request, response);
            break;
        


        // =========================
        // DEFAULT
        // =========================
        default:
            response.sendRedirect(
                "controlador?operacion=listadoPescadores"
            );
        }
    }

    @Override
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}

