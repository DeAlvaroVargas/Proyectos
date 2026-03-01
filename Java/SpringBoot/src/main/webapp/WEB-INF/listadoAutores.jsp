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
<jsp:directive.include file="../includes/includefile.jspf"/>
</head>
<body>
   <div class="container">
       <div class="header"></div>
       <div class="menu">
           <jsp:directive.include file="../WEB-INF/menu.jspf" />
       </div>
       <!-- Aqui iría el contenido de las páginas -->
       <h2>Listado de Autores</h2>

    <table border="1" cellpadding="5" cellspacing="0">
        <tr>
            <th>ID Autor</th>
            <th>Nombre</th>
            <th>Fecha de Nacimiento</th>
        </tr>

        <c:forEach var="autor" items="${listadoAutores}">
            <tr>
                <td>${autor.idautor}</td>
                <td>${autor.nombre}</td>
                <td>${autor.fechanacimiento}</td>
            </tr>
        </c:forEach>
    </table>
   </div>
</body>
</html>
