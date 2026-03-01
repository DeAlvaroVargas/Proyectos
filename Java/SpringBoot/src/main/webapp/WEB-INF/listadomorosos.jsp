<%@taglib uri="jakarta.tags.core" prefix="c"%>
<%@taglib uri="jakarta.tags.fmt" prefix="fmt"%>

<%@ page language="java"
contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Home</title>
    <jsp:directive.include file="../includes/includefile.jspf" />
</head>
<body>
    <div class="container">
        <div class="header"></div>
        <div class="menu">
            <jsp:directive.include file="../WEB-INF/menu.jspf" />
        </div>

        <h2>Listado de socios morosos</h2>

        <table border="1" cellpadding="5" cellspacing="0">
            <tr>
                <th>ID Socio</th>
                <th>Nombre</th>
                <th>Acciones</th>
            </tr>

            <c:forEach var="socio" items="${listadoMorosos}">
                <tr>
                    <td>${socio.idsocio}</td>
                    <td>${socio.nombre}</td>
                    <td>
                        <a
                            href="${pageContext.request.contextPath}/controlleradmin?operacion=verLibrosMoroso&idsocio=${socio.idsocio}">
                            Ver libros
</a>
                    </td>
                </tr>
            </c:forEach>
        </table>

        <c:if test="${not empty listaLibrosMoroso}">
            <br>
            <br>
            <h3>Libros pendientes de devolver del socio: ${nombreSocio}</h3>

            <table border="1" cellpadding="5" cellspacing="0">
                <tr>
                    <th>Título</th>
                    <th>Fecha Préstamo</th>
                    <th>Días de demora</th>
                </tr>

                <c:forEach var="libro" items="${listaLibrosMoroso}">
                    <tr>
                        <td>${libro.titulo}</td>
                        <td>
                            <fmt:formatDate value="${libro.fechaprestamo}" pattern="dd/MM/yyyy" />
                        </td>
                        <td>${libro.diasdemora} días</td>
                    </tr>
                </c:forEach>
            </table>

            <br>

        </c:if>

    </div>
</body>