<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Biblioteca - Nuevo Préstamo</title>
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

        input[type="number"] {
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

        .back-link {
            display: block;
            text-align: center;
            margin-top: 20px;
            color: #2f4050;
            text-decoration: none;
            font-weight: bold;
        }

        .back-link:hover {
            text-decoration: underline;
        }

        /* Alerta de mensaje */
        .alert-success {
            background-color: #dff0d8;
            color: #3c763d;
            padding: 15px;
            margin-top: 20px;
            border: 1px solid #d6e9c6;
            border-radius: 4px;
            text-align: center;
            font-weight: bold;
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
    <p>Registro de préstamos y circulación</p>
</header>

<div class="container">
    <div class="card">
        <h2>Nuevo Préstamo</h2>

        <form action="controller" method="post">
            <input type="hidden" name="operacion" value="hacerPrestamo">

            <div class="form-group">
                <label for="idEjemplar">ID Ejemplar:</label>
                <input type="number" id="idEjemplar" name="idEjemplar" required placeholder="Ingrese ID del libro">
            </div>

            <div class="form-group">
                <label for="idSocio">ID Socio:</label>
                <input type="number" id="idSocio" name="idSocio" required placeholder="Ingrese ID del socio">
            </div>

            <button type="submit" class="btn-submit">Crear Préstamo</button>
        </form>

        <c:if test="${not empty mensaje}">
            <div class="alert-success">
                ${mensaje}
            </div>
        </c:if>

        <a href="index.jsp" class="back-link">← Volver al menú principal</a>
    </div>
</div>

<footer>
    <p>Proyecto JPA + JSP · Desarrollo de Aplicaciones Web</p>
</footer>

</body>
</html>