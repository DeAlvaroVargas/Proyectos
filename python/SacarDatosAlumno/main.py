from fastapi import FastAPI, Query
import pandas as pd

# Crear la app FastAPI
app = FastAPI(title="iesazarquiel")

# Cargar los datos del CSV
df = pd.read_csv("datos_alumnos.csv", encoding="latin-1")

@app.get("/")
def root():
    return {"mensaje": "API iesazarquiel funcionando"}

# Endpoint 1: info-alumnos
@app.get("/info-alumnos")
def info_alumnos():
    return {"ids_alumnos": df["id"].tolist()}


# Endpoint 2: asistencia
@app.get("/asistencia")
def asistencia(id: int = Query(None, description="ID del alumno")):
    if id is None:
        return {
            "mensaje": "Este endpoint puede recibir 1 parámetro opcional: 'id' del alumno. Ejemplo: /asistencia?id=123"
        }

    alumno = df[df["id"] == id]
    if alumno.empty:
        return {"error": "No se encontró ningún alumno con ese ID"}
    
    alumno_info = alumno.iloc[0]
    return {
        "nombre": alumno_info["nombre"],
        "apellidos": alumno_info["apellidos"],
        "asistencia": f"{alumno_info['asistencia']}%"
    }

# Endpoint 3: notas
@app.get("/notas")
def notas(id: int = Query(None, description="ID del alumno"), nota: str = Query(None, description="Categoría de nota")):
    if id is None and nota is None:
        return {
            "mensaje": "Este endpoint puede recibir 1 o 2 parámetros opcionales: 'id' del alumno y 'nota' (nombre de la asignatura). Ejemplo: /notas?id=123&nota=matematicas"
        }

    if id is None:
        return {"error": "Debes indicar el 'id' del alumno para consultar la nota"}
    
    alumno = df[df["id"] == id]
    if alumno.empty:
        return {"error": "No se encontró ningún alumno con ese ID"}
    
    alumno_info = alumno.iloc[0]

    if nota is None:
        # Devolver todas las notas
        notas_alumno = alumno_info.drop(["id", "nombre", "apellidos", "asistencia"]).to_dict()
        return {
            "nombre": alumno_info["nombre"],
            "apellidos": alumno_info["apellidos"],
            "notas": notas_alumno
        }
    
    if nota not in df.columns:
        return {"error": f"La nota '{nota}' no existe. Posibles valores: {', '.join([c for c in df.columns if c not in ['id','nombre','apellidos','asistencia']])}"}
    
    return {
        "nombre": alumno_info["nombre"],
        "apellidos": alumno_info["apellidos"],
        "nota_consultada": {nota: alumno_info[nota]}
    }
