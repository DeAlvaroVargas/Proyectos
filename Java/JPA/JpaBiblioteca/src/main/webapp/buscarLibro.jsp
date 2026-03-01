<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Biblioteca - Buscar Libro</title>
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
            max-width: 600px;
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

        input[type="text"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
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
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 4px;
            border-left: 5px solid #2f4050;
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 10px 0 0 0;
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
    <p>Consulta de ejemplares por ISBN</p>
</header>

<div class="container">
    <div class="card">
        <h2>Buscar libro por ISBN</h2>

        <form action="${pageContext.request.contextPath}/controller" method="get">
            <input type="hidden" name="operacion" value="buscarLibro">

            <div class="form-group">
                <label for="id">ISBN del libro:</label>
                <input type="text" id="id" name="id" required placeholder="Ej: 9781234567890">
            </div>

            <button type="submit" class="btn">Realizar búsqueda</button>
        </form>

        <c:if test="${not empty libro}">
            <div class="result-box">
                <h3>Libro localizado</h3>
                <ul>
                    <li><strong>Título:</strong> ${libro.titulo}</li>
                    <c:if test="${not empty libro.autor}">
                        <li><strong>Autor:</strong> ${libro.autor.nombre}</li>
                    </c:if>
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
