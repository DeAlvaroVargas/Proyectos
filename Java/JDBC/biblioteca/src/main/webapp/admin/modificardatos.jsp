<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Editar Socio</title>
<jsp:directive.include file="../includes/includefile.jspf" />

</head>
<body>
<div class="container">
    <div class="header"></div>
    <div class="menu">
        <jsp:directive.include file="../WEB-INF/menu.jspf" />
    </div>
    
    <div class="container-edicion">
    	<c:if test="${not empty mensaje}">
    <p style="color:green; font-weight:bold; padding:10px; background-color:#d4edda; border:1px solid #c3e6cb; border-radius:5px;">
        ${mensaje}
    </p>
</c:if>

<c:if test="${not empty error}">
    <p style="color:red; font-weight:bold; padding:10px; background-color:#f8d7da; border:1px solid #f5c6cb; border-radius:5px;">
        ${error}
    </p>
</c:if>
        <h2>Editar Datos del Socio</h2>
        
        <div class="formulario-edicion">
            <form method="post" action="${pageContext.request.contextPath}/controllerAdmin">
                <input type="hidden" name="operacion" value="modificarSocio">
                <input type="hidden" name="idsocio" value="${socio.idsocio}">
                <input type="hidden" name="version" value="${socio.version}">
                
                <label for="idsocio_display">ID Socio:</label>
                <input type="text" id="idsocio_display" value="${socio.idsocio}" disabled>
                <div class="info-readonly">(El ID no se puede modificar)</div>
                
                <label for="email_display">Email:</label>
                <input type="text" id="email_display" value="${socio.email}" disabled>
                <div class="info-readonly">(El email no se puede modificar)</div>
                
                <label for="nombre">Nombre: *</label>
                <input type="text" id="nombre" name="nombre" value="${socio.nombre}" required>
                
                <label for="direccion">Dirección: *</label>
                <input type="text" id="direccion" name="direccion" value="${socio.direccion}" required>
                
                <input type="submit" value="Modificar">
            </form>
        </div>
    </div>
</div>
</body>
</html>