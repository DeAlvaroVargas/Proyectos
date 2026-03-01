<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="jakarta.tags.core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Gestión de Pesca - Menú</title>

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
            padding: 25px;
            text-align: center;
        }

        .container {
            width: 80%;
            margin: 40px auto;
        }

        .menu-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 20px;
        }

        .menu-card {
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 6px;
            padding: 25px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .menu-card h3 {
            color: #2f4050;
            margin-bottom: 15px;
        }

        .menu-card p {
            color: #555;
            font-size: 0.95em;
            margin-bottom: 20px;
        }

        .btn {
            display: inline-block;
            padding: 10px 18px;
            background-color: #2f4050;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            font-size: 0.9em;
        }

        .btn:hover {
            background-color: #1c2833;
        }

        .btn-secondary {
            background-color: #5a5a5a;
        }

        .btn-secondary:hover {
            background-color: #3f3f3f;
        }

        footer {
            background-color: #e0e0e0;
            text-align: center;
            padding: 15px;
            margin-top: 50px;
            font-size: 0.9em;
        }
    </style>
</head>

<body>

<header>
    <h1>Gestión de Pesca</h1>
    <p>Aplicación de control de pescadores y capturas</p>
</header>

<div class="container">

    <div class="menu-grid">

        <!-- LISTADO DE PESCADORES -->
        <div class="menu-card">
            <h3>Pescadores</h3>
            <p>Consulta el listado de pescadores registrados en el sistema.</p>
            <a href="${pageContext.request.contextPath}/controlador?operacion=listadoPescadores"
               class="btn">
               Ver pescadores
            </a>
        </div>

        <!-- LISTADO DE ESPECIES -->
        <div class="menu-card">
            <h3>Especies</h3>
            <p>Visualiza las especies disponibles y su número de capturas.</p>
            <a href="${pageContext.request.contextPath}/controlador?operacion=listadoEspecies"
               class="btn">
               Ver especies
            </a>
        </div>

        <!-- FUTURA OPCIÓN -->
        <div class="menu-card">
            <h3>Registrar captura</h3>
            <p>Registrar una nueva jornada de pesca .</p>
            <a href="${pageContext.request.contextPath}/controlador?operacion=nuevaCaptura"
               class="btn">
               Registrar
            </a>
        </div>

        <!-- FUTURA OPCIÓN -->
        <div class="menu-card">
            <h3>Nuevo pescador</h3>
            <p>Añadir un nuevo pescador al sistema .</p>
            <a href="${pageContext.request.contextPath}/controlador?operacion=nuevoPescador"
               class="btn">
               Registrar
            </a>
        </div>

    </div>
</div>

<footer>
    <p>Proyecto JPA + JSP · Gestión de Pesca</p>
</footer>

</body>
</html>
