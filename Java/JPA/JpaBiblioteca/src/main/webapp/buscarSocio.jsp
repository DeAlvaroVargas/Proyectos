<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Biblioteca - Buscar Socio</title>
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
            max-width: 600px; /* Más estrecho para formularios */
            margin: 30px auto;
        }

        .card {
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 25px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        h2, h3 {
            color: #2f4050;
            margin-top: 0;
        }

        /* Estilos del formulario */
        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #333;
        }

        input[type="number"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box; /* Para que el padding no afecte al ancho */
        }

        /* Botones y enlaces */
        .btn {
            display: inline-block;
            width: 100%;
            padding: 12px;
            background-color: #2f4050;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            border: none;
            cursor: pointer;
            font-size: 1em;
            text-align: center;
        }

        .btn:hover {
            background-color: #1c2833;
        }

        .btn-link {
            display: block;
            margin-top: 20px;
            text-align: center;
            color: #2f4050;
            text-decoration: none;
            font-weight: bold;
        }

        .btn-link:hover {
            text-decoration: underline;
        }

        /* Resultados y mensajes */
        .result-box {
            margin-top: 25px;
            padding-top: 20px;
            border-top: 2px solid #f2f2f2;
        }

        ul {
            list-style: none;
            padding: 0;
        }

        li {
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }

        .mensaje-error {
            color: #d9534f;
            background-color: #f2dede;
            padding: 15px;
            border-radius: 4px;
            border: 1px solid #ebccd1;
            margin-top: 20px;
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
    <p>Búsqueda de socios registrados</p>
</header>

<div class="container">
    <div class="card">
        <h2>Buscar socio por ID</h2>

        <form action="${pageContext.request.contextPath}/controller" method="get">
            <input type="hidden" name="operacion" value="buscarSocio">

            <div class="form-group">
                <label for="id">ID del socio:</label>
                <input type="number" id="id" name="id" required placeholder="Ej: 123">
            </div>

            <button type="submit" class="btn">Realizar búsqueda</button>
        </form>

        <c:if test="${not empty socio}">
            <div class="result-box">
                <h3>Datos del socio encontrado</h3>
                <ul>
                    <li><strong>ID:</strong> ${socio.idsocio}</li>
                    <li><strong>Nombre:</strong> ${socio.nombre}</li>
                    <li><strong>Email:</strong> ${socio.email}</li>
                </ul>
            </div>
        </c:if>

        <c:if test="${not empty mensaje}">
            <div class="mensaje-error">
                ${mensaje}
            </div>
        </c:if>

        <a href="index.jsp" class="btn-link">← Volver al menú principal</a>
    </div>
</div>

<footer>
    <p>Proyecto JPA + JSP · Desarrollo de Aplicaciones Web</p>
</footer>

</body>
</html>