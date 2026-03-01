
<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Buscar Socio</title>
<jsp:directive.include file="../includes/includefile.jspf" />

</head>
<body>
<div class="container">
    <div class="header"></div>
    <div class="menu">
        <jsp:directive.include file="../WEB-INF/menu.jspf" />
    </div>
    
    <div class="container-busqueda">
        <h2>Buscar Socio para Modificar</h2>
        
        <!-- Formulario de búsqueda -->
        <div class="formulario-busqueda">
            <form method="post" action="${pageContext.request.contextPath}/controllerAdmin">
                <input type="hidden" name="operacion" value="buscarSocio">
                <label for="nombre">Nombre del socio:</label><br><br>
                <input type="text" id="nombre" name="nombre" 
                       value="${nombreBuscado}" 
                       placeholder="Introduce parte del nombre..." 
                       required>
                <input type="submit" value="Buscar">
            </form>
        </div>
        
        <!-- Resultados de la búsqueda -->
        <c:if test="${not empty nombreBuscado}">
            <c:choose>
                <c:when test="${not empty resultados}">
                    <h3>Resultados de la búsqueda:</h3>
                    <table class="tabla-resultados" border="1">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Dirección</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <c:forEach var="socio" items="${resultados}">
                                <tr>
                                    <td>${socio.idsocio}</td>
                                    <td>${socio.nombre}</td>
                                    <td>${socio.email}</td>
                                    <td>${socio.direccion}</td>
                                    <td>
                                        <a href="${pageContext.request.contextPath}/controllerAdmin?operacion=editarSocio&idsocio=${socio.idsocio}" 
                                           class="link-editar">Editar</a>
                                    </td>
                                </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </c:when>
                <c:otherwise>
                    <div class="mensaje-sin-resultados">
                        <strong>No se encontraron socios</strong> que coincidan con "<strong>${nombreBuscado}</strong>".
                    </div>
                </c:otherwise>
            </c:choose>
        </c:if>
    </div>
</div>
</body>
</html>
