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
       <!-- Aqui iría el contenido de las páginas -->
       
       <h2>Registrar nuevo préstamo</h2>
       
       
        <c:if test="${error != null}">
            <div class="diverror">
                <p>
                    <strong>Error</strong><br>
                    <c:out value="${error}" />
                </p>
            </div>
        </c:if>

        
        <c:if test="${mensaje != null}">
            <div class="divconfirmacion">
                <p>
                    <strong>Mensaje</strong><br>
                    <c:out value="${mensaje}" />
                </p>
            </div>
        </c:if>

    <form name="frmPrestamo" method="post" action="${pageContext.request.contextPath}/controllerAdmin">
        <input type="hidden" name="operacion" value="nuevoPrestamo">
        
        <label>ID Ejemplar:</label>
        <input type="number" name="idejemplar" required><br>

        <label>ID Socio:</label>
        <input type="number" name="idsocio" required><br>

        <button type="submit">Registrar préstamo</button>
    </form>
       
   </div>
</body>
</html>