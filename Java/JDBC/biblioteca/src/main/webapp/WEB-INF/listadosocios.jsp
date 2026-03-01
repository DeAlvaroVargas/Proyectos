<%@taglib uri="jakarta.tags.core" prefix="c"%>
<%@taglib uri="jakarta.tags.fmt" prefix="fmt"%>

<%@ page language="java"
contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Listado de Socios</title>
<jsp:directive.include file="../includes/includefile.jspf" />

</head>
<body>
<div class="container">
    <div class="header"></div>
    <div class="menu">
        <jsp:directive.include file="../WEB-INF/menu.jspf" />
    </div>
    
    <div>
        <h2>Listado de Socios</h2>
        
        
        
        <!-- Tabla de socios -->
        <table border="1" cellpadding="5" cellspacing="0">
            <tr>
                <th>ID Socio</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Dirección</th>
            </tr>

            <c:forEach var="socio" items="${listadoSocios}">
                <tr>
                    <td>${socio.idsocio}</td>
                    <td>${socio.nombre}</td>
                    <td>${socio.email}</td>
                    <td>${socio.direccion}</td>
                </tr>
            </c:forEach>
        </table>
        
        <!-- Información de paginación -->
        <div class="pagination">
            <div class="pagination-info">
                Total de registros: ${totalRegistros}<br/>
                Mostrando desde ${limiteInferior} a ${limiteSuperior}
            </div>
            
            <!-- Enlaces de navegación -->
            <div class="pagination-links">
                <button><a href="${pageContext.request.contextPath}/controller?operacion=listarSocios&pag=${paginaactual - 1 < 0 ? paginaMasAlta : paginaactual - 1}&nrp=${registrosporpagina}">Ant</a>
                </button>
                <button><a href="${pageContext.request.contextPath}/controller?operacion=listarSocios&pag=${paginaactual + 1 > paginaMasAlta ? 0 : paginaactual + 1}&nrp=${registrosporpagina}">Sig</a>
            	</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>