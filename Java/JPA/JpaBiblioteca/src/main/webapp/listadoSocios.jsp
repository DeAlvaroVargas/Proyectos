<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<%@ page language="java"
         contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Pesca - Listado de Pescadores</title>

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

        .btn:hover {
            background-color: #1c2833;
        }

        .btn-secondary {
            background-color: #555;
        }

        footer {
            background-color: #e0e0e0;
            text-align: center;
            padding: 15px;
            margin-top: 40px;
            font-size: 0.9em;
        }

        .error-msg {
            color: #d9534f;
            background-color: #f2dede;
            padding: 15px;
            border-radius: 4px;
            border: 1px solid #ebccd1;
        }
    </style>
</head>

<body>

<header>
    <h1>Gestión de Pescadores</h1>
    <p>Listado completo de pescadores registrados</p>
</header>

<div class="container">
    <div class="card">

        <div class="actions">
            <a href="${pageContext.request.contextPath}/controller?operacion=listadoPescadores"
               class="btn btn-secondary">
               Recargar listado
            </a>

            <a href="index.jsp" class="btn btn-secondary">
                Volver al Menú
            </a>
        </div>

        <c:choose>
            <c:when test="${not empty pescadores}">
                <h3>Pescadores Registrados</h3>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Código</th>
                            <th>Nombre del Pescador</th>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach var="p" items="${pescadores}">
                            <tr>
                                <td><strong>${p.id}</strong></td>
                                <td>${p.codigo}</td>
                                <td>${p.nombre}</td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>
            </c:when>

            <c:otherwise>
                <div class="error-msg">
                    No hay pescadores registrados en el sistema actualmente.
                </div>
            </c:otherwise>
        </c:choose>

    </div>
</div>

<footer>
    <p>Proyecto JPA + JSP · Gestión de Pesca</p>
</footer>

</body>
</html>
