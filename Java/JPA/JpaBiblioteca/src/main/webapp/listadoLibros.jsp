<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Biblioteca - Listado de Libros</title>
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
        }

        td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
        }

        tr:hover {
            background-color: #f9f9f9;
        }

        /* Botones y acciones */
        .actions {
            margin-bottom: 20px;
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #2f4050;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            border: none;
            cursor: pointer;
            font-size: 0.9em;
        }

        .btn-secondary {
            background-color: #555;
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
            color: #666;
            font-style: italic;
            padding: 20px;
            text-align: center;
        }
    </style>
</head>
<body>

<header>
    <h1>Gestión de Libros</h1>
    <p>Consulta el catálogo completo de la biblioteca</p>
</header>

<div class="container">
    <div class="card">
        <div class="actions">
            <a href="index.jsp" class="btn btn-secondary">← Volver al Menú Principal</a>
        </div>
        
        <h3>Libros en Catálogo</h3>

        <c:choose>
            <c:when test="${not empty listaLibros}">
                <table>
                    <thead>
                        <tr>
                            <th>Título del Libro</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach var="libro" items="${listaLibros}">
                            <tr>
                                <td><strong>${libro.titulo}</strong></td>
                                <td>${libro.autor.nombre}</td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>
            </c:when>
            <c:otherwise>
                <p class="empty-msg">No hay libros registrados en el catálogo en este momento.</p>
            </c:otherwise>
        </c:choose>
    </div>
</div>

<footer>
    <p>Proyecto JPA + JSP · Desarrollo de Aplicaciones Web</p>
</footer>

</body>
</html>