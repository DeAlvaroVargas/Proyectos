# hundir_flota_modulo.py
import random

def crear_tablero(tamaño=10):
    """Crea un tablero vacío de tamaño 10x10 con '-'."""
    return [['-' for _ in range(tamaño)] for _ in range(tamaño)]

def colocar_barco(tablero):
    """Coloca un barco de 3 casillas en el tablero (horizontal o vertical)."""
    tamaño = len(tablero)
    orientacion = random.choice(['H', 'V'])
    
    if orientacion == 'H':
        fila = random.randint(0, tamaño - 1)
        col = random.randint(0, tamaño - 3)
        for i in range(3):
            tablero[fila][col + i] = 'B'
    else:
        fila = random.randint(0, tamaño - 3)
        col = random.randint(0, tamaño - 1)
        for i in range(3):
            tablero[fila + i][col] = 'B'
    return tablero

def mostrar_tablero(tablero, mostrar_barco=False):
    """Muestra el tablero, ocultando los barcos si mostrar_barco=False."""
    print("   " + " ".join(str(i+1) for i in range(10)))
    for i, fila in enumerate(tablero):
        letra = chr(65 + i)
        if not mostrar_barco:
            fila_oculta = ['-' if c == 'B' else c for c in fila]
            print(f"{letra}  " + " ".join(fila_oculta))
        else:
            print(f"{letra}  " + " ".join(fila))

def traducir_coordenada(coord):
    """Convierte una coordenada tipo A1 a índices de lista [fila, col]."""
    try:
        fila = ord(coord[0].upper()) - 65
        col = int(coord[1:]) - 1
        if 0 <= fila < 10 and 0 <= col < 10:
            return fila, col
        else:
            return None
    except:
        return None

def disparar(tablero, fila, col):
    """Evalúa el disparo y devuelve si fue agua, tocado o hundido."""
    if tablero[fila][col] == 'B':
        tablero[fila][col] = 'X'
        if not any('B' in fila for fila in tablero):
            return "hundido"
        return "tocado"
    elif tablero[fila][col] == '-':
        tablero[fila][col] = 'O'
        return "agua"
    elif tablero[fila][col] in ('X', 'O'):
        return "ya_usado"
