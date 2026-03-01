<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Buscar Socio</title>
<jsp:directive.include file="../includes/includefile.jspf" />
<body>
<div class="container">
<div class="header"></div>
<div class="menu">
<jsp:directive.include file="../WEB-INF/menu.jspf" />
</div>

<div class="container-formulario">
<h2>Alta de Nuevo Socio</h2>

<!-- Mensaje de éxito -->
<c:if test="${not empty mensaje}">
<div class="mensaje-exito">
<p style="color:green; font-weight:bold; padding:10px; background-color:#d4edda; border:1px solid #c3e6cb; border-radius:5px;">
✓ ${mensaje}
</p>
</div>
</c:if>

<!-- Mensaje de error -->
<c:if test="${not empty error}">
<div class="mensaje-error">
<p style="color:red; font-weight:bold; padding:10px; background-color:#f8d7da; border:1px solid #f5c6cb; border-radius:5px;">
❌ ${error}
</p>
</div>
</c:if>

<!-- Formulario de alta -->
<div class="formulario-alta">
<form method="post" action="${pageContext.request.contextPath}/controllerAdmin">
<input type="hidden" name="operacion" value="altaSocio">

<label for="nombre">Nombre completo: *</label>
<input type="text" 
       id="nombre" 
       name="nombre" 
       value="${param.nombre}"
       placeholder="Introduce el nombre completo"
       required
       maxlength="100">

<label for="email">Email: *</label>
<input type="email" 
       id="email" 
       name="email" 
       value="${param.email}"
       placeholder="ejemplo@correo.com"
       required
       maxlength="100">

<label for="direccion">Dirección: *</label>
<input type="text" 
       id="direccion" 
       name="direccion" 
       value="${param.direccion}"
       placeholder="Calle, número, ciudad..."
       required
       maxlength="200">

<div class="botones">
<input type="submit" value="Dar de Alta">
<input type="reset" value="Limpiar">
</div>
</form>
</div>

<div class="nota">
<p><strong>Nota:</strong> Todos los campos son obligatorios. El email debe ser único en el sistema.</p>
</div>
</div>
</div>
<script src="https://www.google.com/recaptcha/api.js?render=6LeNZfsrAAAAAL22ieQ9zBHWq6BknTBPAYUGrHTn"></script>

<script>
grecaptcha.ready(function() {
    grecaptcha.execute('6LeNZfsrAAAAAL22ieQ9zBHWq6BknTBPAYUGrHTn', {action: 'altasocio'})
    .then(function(token) {
        var form = document.querySelector('form');
        var recaptchaResponse = document.createElement('input');
        recaptchaResponse.setAttribute('type', 'hidden');
        recaptchaResponse.setAttribute('name', 'g-recaptcha-response');
        recaptchaResponse.setAttribute('value', token);
        form.appendChild(recaptchaResponse);
    });
});
</script>

</body>
</html>