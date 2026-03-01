<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Biblioteca - Menú Principal</title>

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
            margin: 30px auto;
        }

        .menu {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
        }

        .card {
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 25px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
        }

        .card h2 {
            color: #2f4050;
            margin-bottom: 10px;
        }

        .card p {
            color: #555;
            font-size: 0.95em;
            margin-bottom: 20px;
        }

        .card a {
            display: block;
            margin: 8px auto;
            padding: 10px;
            width: 80%;
            background-color: #2f4050;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
        }

        .card a:hover {
            background-color: #1c2833;
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
    <p>Aplicación de gestión de la biblioteca del instituto</p>
</header>

<div class="container">

    <div class="menu">

        <!-- SOCIOS -->
        <div class="card">
            <h2>Gestión de Socios</h2>
            <p>Consultas y gestión de socios de la biblioteca.</p>
            <a href="${pageContext.request.contextPath}/controller?operacion=listadoSocios">
                Listar socios
            </a>
            <a href="${pageContext.request.contextPath}/controller?operacion=buscarSocio">
                Buscar socio
            </a>
        </div>

        <!-- LIBROS -->
        <div class="card">
            <h2>Gestión de Libros</h2>
            <p>Consulta de libros disponibles y sus autores.</p>
            <a href="${pageContext.request.contextPath}/controller?operacion=listadoLibros">
                Listar libros
            </a>
            <a href="${pageContext.request.contextPath}/controller?operacion=buscarLibro">
                Buscar libro
            </a>
        </div>

        <!-- PRÉSTAMOS -->
        <div class="card">
            <h2>Gestión de Préstamos</h2>
            <p>Control de préstamos y devoluciones.</p>
            <a href="${pageContext.request.contextPath}/controller?operacion=listadoPrestamos">
                Préstamos activos
            </a>
            <a href="${pageContext.request.contextPath}/controller?operacion=prestamosPorSocio">
                Préstamos por socio
            </a>
        </div>

        <!-- NUEVO PRÉSTAMO -->
        <div class="card">
            <h2>Nuevo Préstamo</h2>
            <p>Registrar un nuevo préstamo de un ejemplar.</p>
            <a href="${pageContext.request.contextPath}/controller?operacion=nuevoPrestamo">
                Registrar préstamo
            </a>
        </div>

    </div>

</div>

<footer>
    <p>Proyecto JPA + JSP · Desarrollo de Aplicaciones Web</p>
</footer>

</body>
</html>
