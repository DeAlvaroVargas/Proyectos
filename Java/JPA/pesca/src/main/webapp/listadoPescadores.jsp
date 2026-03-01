<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="jakarta.tags.core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Listado de Pescadores</title>

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
            width: 85%;
            margin: 30px auto;
        }

        .card {
            background-color: white;
            padding: 25px;
            border-radius: 6px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

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

        .actions {
            margin-bottom: 20px;
            display: flex;
            gap: 10px;
        }

        .btn {
            padding: 10px 18px;
            background-color: #2f4050;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
        }

        .btn:hover {
            background-color: #1c2833;
        }

        .btn-secondary {
            background-color: #555;
        }

        .error-msg {
            color: #a94442;
            background-color: #f2dede;
            padding: 15px;
            border-radius: 4px;
            border: 1px solid #ebccd1;
        }
    </style>
</head>

<body>

<header>
    <h1>Listado de Pescadores</h1>
    <p>Pescadores registrados en el sistema</p>
</header>

<div class="container">
    <div class="card">

        <div class="actions">
            <a href="menu.jsp" class="btn btn-secondary">Volver al menú</a>
        </div>

        <c:choose>
            <c:when test="${not empty pescadores}">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Código</th>
                        <th>Nombre</th>
                    </tr>
                    <c:forEach var="p" items="${pescadores}">
                        <tr>
                            <td>${p.idPescador}</td>
                            <td>${p.codigo}</td>
                            <td>${p.nombre}</td>
                        </tr>
                    </c:forEach>
                </table>
            </c:when>
            <c:otherwise>
                <div class="error-msg">
                    No hay pescadores registrados.
                </div>
            </c:otherwise>
        </c:choose>
    </div>
</div>
</body>
</html>
