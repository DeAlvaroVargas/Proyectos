<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Biblioteca - Préstamos por Socio</title>
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
            max-width: 800px;
            margin: 30px auto;
        }

        .card {
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 25px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }

        h2, h3 {
            color: #2f4050;
            margin-top: 0;
        }

        /* Formulario de búsqueda */
        .search-box {
            display: flex;
            gap: 10px;
            align-items: flex-end;
            margin-top: 15px;
        }

        .form-group {
            flex-grow: 1;
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
            box-sizing: border-box;
        }

        /* Botones */
        .btn {
            padding: 10px 20px;
            background-color: #2f4050;
            color: white;
            border: none;
            border-radius: 4px;
            font-weight: bold;
            cursor: pointer;
            height: 38px;
        }

        .btn:hover {
            background-color: #1c2833;
        }

        .btn-link {
            display: block;
            text-align: center;
            margin-top: 20px;
            color: #2f4050;
            text-decoration: none;
            font-weight: bold;
        }

        /* Tabla de resultados */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th {
            background-color: #2f4050;
            color: white;
            padding: 12px;
            text-align: left;
            font-size: 0.9em;
        }

        td {
            padding: 12px;
            border-bottom: 1px solid #eee;
            font-size: 0.9em;
        }

        tr:hover {
            background-color: #fcfcfc;
        }

        /* Mensajes de Alerta */
        .mensaje-error {
            color: #d9534f;
            background-color: #f2dede;
            padding: 15px;
            border-radius: 4px;
            border: 1px solid #ebccd1;
            margin-top: 15px;
        }

        .mensaje-info {
            color: #31708f;
            background-color: #d9edf7;
            padding: 15px;
            border-radius: 4px;
            border: 1px solid #bce8f1;
            margin-top: 15px;
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
    <p>Consulta histórica de préstamos por socio</p>
</header>

<div class="container">
    <div class="card">
        <h2>Búsqueda de Préstamos</h2>
        <form action="controller" method="get">
            <input type="hidden" name="operacion" value="buscarPrestamosPorSocio">
            
            <div class="search-box">
                <div class="form-group">
                    <label for="idSocio">ID del socio:</label>
                    <input type="number" id="idSocio" name="idSocio" required placeholder="Ingrese el código del socio">
                </div>
                <button type="submit" class="btn">Buscar</button>
            </div>
        </form>

        <c:if test="${not empty mensaje}">
            <div class="mensaje-error">${mensaje}</div>
        </c:if>
    </div>

    <c:if test="${not empty prestamos}">
        <div class="card">
            <h3>Resultados de la consulta</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID Ejemplar</th>
                        <th>Título del Libro</th>
                        <th>Fecha Préstamo</th>
                        <th>Límite Devolución</th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach var="p" items="${prestamos}">
                        <tr>
                            <td><strong>${p.ejemplar.idejemplar}</strong></td>
                            <td>${p.ejemplar.libro.titulo}</td>
                            <td>${p.fechaprestamo}</td>
                            <td>${p.fechalimitedevolucion}</td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
    </c:if>
    <c:if test="${not empty mensaje}">
    <p style="color:red">${mensaje}</p>
</c:if>
    

    <c:if test="${prestamos != null and empty prestamos}">
        <div class="card">
            <div class="mensaje-info">No se han encontrado préstamos registrados para este socio.</div>
        </div>
    </c:if>

    <a href="index.jsp" class="btn-link">← Volver al menú principal</a>
</div>

<footer>
    <p>Proyecto JPA + JSP · Desarrollo de Aplicaciones Web</p>
</footer>

</body>
</html>