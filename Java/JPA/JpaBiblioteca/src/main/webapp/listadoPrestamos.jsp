<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Biblioteca - Préstamos Activos</title>
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
            width: 90%; /* Un poco más ancho para albergar la tabla de préstamos */
            margin: 30px auto;
        }

        .card {
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 25px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        h3 {
            color: #2f4050;
            border-bottom: 2px solid #2f4050;
            padding-bottom: 10px;
            margin-top: 0;
        }

        /* Estilos de la tabla */
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
            text-transform: uppercase;
        }

        td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
            font-size: 0.95em;
        }

        tr:hover {
            background-color: #f9f9f9;
        }

        /* Botones y acciones */
        .actions {
            margin-bottom: 20px;
        }

        .btn-secondary {
            display: inline-block;
            padding: 10px 20px;
            background-color: #555;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            font-size: 0.9em;
        }

        .btn-secondary:hover {
            background-color: #333;
        }

        footer {
            background-color: #e0e0e0;
            text-align: center;
            padding: 15px;
            margin-top: 40px;
            font-size: 0.9em;
        }

        .empty-msg {
            color: #d9534f;
            background-color: #f2dede;
            padding: 15px;
            border-radius: 4px;
            text-align: center;
        }
    </style>
</head>
<body>

<header>
    <h1>Gestión de Biblioteca</h1>
    <p>Control y seguimiento de préstamos activos</p>
</header>

<div class="container">
    <div class="card">
        <div class="actions">
            <a href="index.jsp" class="btn-secondary">← Volver al Menú Principal</a>
        </div>
        
        <h3>Préstamos en curso</h3>

        <c:choose>
            <c:when test="${not empty listaPrestamos}">
                <table>
                    <thead>
                        <tr>
                            <th>Ejemplar</th>
                            <th>Socio</th>
                            <th>Fecha Préstamo</th>
                            <th>Límite Devolución</th>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach var="prestamo" items="${listaPrestamos}">
                            <tr>
                                <td><strong>${prestamo.ejemplar.libro.titulo}</strong></td>
                                
                                <td>${prestamo.socio.nombre}</td>
                                <td>${prestamo.fechaprestamo}</td>
                                <td>${prestamo.fechalimitedevolucion}</td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>
            </c:when>
            <c:otherwise>
                <div class="empty-msg">
                    No se han encontrado préstamos activos en el sistema.
                </div>
            </c:otherwise>
        </c:choose>
    </div>
</div>

<footer>
    <p>Proyecto JPA + JSP · Desarrollo de Aplicaciones Web</p>
</footer>

</body>
</html>