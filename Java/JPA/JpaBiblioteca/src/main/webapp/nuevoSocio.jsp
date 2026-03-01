<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Biblioteca - Nuevo Socio</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
        }

        header {
            background-color: #2f4050;
            color: white;
            padding: 20px;
            text-align: center;
        }

        .container {
            width: 85%;
            max-width: 500px;
            margin: 30px auto;
        }

        .card {
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 25px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        h2 {
            color: #2f4050;
            margin-top: 0;
            text-align: center;
            border-bottom: 2px solid #f2f2f2;
            padding-bottom: 15px;
        }

        /* Formulario */
        .form-group {
            margin-bottom: 15px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
        }

        input[type="text"],
        input[type="email"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }

        /* Botones */
        .btn-submit {
            width: 100%;
            padding: 12px;
            background-color: #2f4050;
            color: white;
            border: none;
            border-radius: 4px;
            font-weight: bold;
            cursor: pointer;
            font-size: 1em;
            margin-top: 10px;
        }

        .btn-submit:hover {
            background-color: #1c2833;
        }

        .btn-back {
            display: block;
            width: 100%;
            padding: 10px;
            background-color: #6c757d;
            color: white;
            text-decoration: none;
            border: none;
            border-radius: 4px;
            font-weight: bold;
            text-align: center;
            margin-top: 10px;
            cursor: pointer;
            box-sizing: border-box;
            font-size: 0.9em;
        }

        .btn-back:hover {
            background-color: #5a6268;
        }

        /* Mensajes de Alerta */
        .alert {
            padding: 15px;
            border-radius: 4px;
            margin-top: 20px;
            font-weight: bold;
            text-align: center;
        }
        .alert-success {
            background-color: #dff0d8;
            color: #3c763d;
            border: 1px solid #d6e9c6;
        }
        .alert-danger {
            background-color: #f2dede;
            color: #a94442;
            border: 1px solid #ebccd1;
        }

        footer {
            background-color: #e0e0e0;
            text-align: center;
            padding: 15px;
            margin-top: 40px;
            font-size: 0.9em;
        }
    </style>
</head>
<body>

<header>
    <h1>Gestión de Biblioteca</h1>
    <p>Registro de nuevos socios en el sistema</p>
</header>

<div class="container">
    <div class="card">
        <h2>Crear nuevo socio</h2>

        <form action="${pageContext.request.contextPath}/controller" method="post">
            <input type="hidden" name="operacion" value="crearSocio">

            <div class="form-group">
                <label for="nombre">Nombre completo:</label>
                <input type="text" id="nombre" name="nombre" required placeholder="Ej: Juan Pérez">
            </div>

            <div class="form-group">
                <label for="email">Correo electrónico:</label>
                <input type="email" id="email" name="email" required placeholder="ejemplo@correo.com">
            </div>

            <button type="submit" class="btn-submit">Guardar socio</button>
        </form>

        <form action="${pageContext.request.contextPath}/controller" method="get">
            <input type="hidden" name="operacion" value="listarSocios">
            <button type="submit" class="btn-back">Cancelar y Volver</button>
        </form>

        <c:if test="${not empty mensajeOk}">
            <div class="alert alert-success">
                ${mensajeOk}
            </div>
        </c:if>

        <c:if test="${not empty mensaje}">
            <div class="alert alert-danger">
                ${mensaje}
            </div>
        </c:if>
    </div>
</div>

<footer>
    <p>Proyecto JPA + JSP · Desarrollo de Aplicaciones Web</p>
</footer>

</body>
</html>