<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="jakarta.tags.core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Registrar Captura</title>

    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
        }

        header {
            background-color: #2f4050;
            color: white;
            padding: 20px;
            text-align: center;
        }

        .container {
            width: 50%;
            margin: 30px auto;
        }

        .card {
            background-color: white;
            padding: 25px;
            border-radius: 6px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        label {
            font-weight: bold;
        }

        input {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            margin-bottom: 20px;
            border-radius: 4px;
            border: 1px solid #ccc;
        }

        .btn {
            padding: 10px 18px;
            background-color: #2f4050;
            color: white;
            border: none;
            border-radius: 4px;
            font-weight: bold;
            cursor: pointer;
        }

        .btn:hover {
            background-color: #1c2833;
        }

        .btn-secondary {
            background-color: #555;
            text-decoration: none;
            padding: 10px 18px;
            border-radius: 4px;
            color: white;
            font-weight: bold;
            margin-left: 10px;
        }

        .error-msg {
            color: #a94442;
            background-color: #f2dede;
            padding: 12px;
            border-radius: 4px;
            margin-bottom: 15px;
        }

        .ok-msg {
            color: #3c763d;
            background-color: #dff0d8;
            padding: 12px;
            border-radius: 4px;
            margin-bottom: 15px;
        }
    </style>
</head>

<body>

<header>
    <h1>Registrar Captura</h1>
    <p>Alta de captura asociada a un pescador</p>
</header>

<div class="container">
    <div class="card">

        <!-- MENSAJES -->
        <c:if test="${not empty mensaje}">
            <div class="error-msg">${mensaje}</div>
        </c:if>

        <c:if test="${not empty mensajeOk}">
            <div class="ok-msg">${mensajeOk}</div>
        </c:if>

        <form action="${pageContext.request.contextPath}/controlador"
              method="post">

            <input type="hidden" name="operacion" value="crearCaptura"/>

            <label for="idPescador">ID del pescador</label>
            <input type="number" name="idPescador" id="idPescador" required/>

            <label for="password">Contraseña</label>
            <input type="password" name="password" id="password" required/>

            <label for="idEspecie">ID de la especie</label>
            <input type="number" name="idEspecie" id="idEspecie" required/>

            <label for="fecha">Fecha de la captura</label>
            <input type="date" name="fecha" id="fecha" required/>

            <button type="submit" class="btn">Registrar captura</button>
            <a href="menu.jsp" class="btn-secondary">Volver</a>
        </form>

    </div>
</div>

</body>
</html>

