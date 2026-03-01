import random

# Diccionario constante con 20 productos
CATALOGO = {
    "Teclado": 25.50,
    "Raton": 15.00,
    "Monitor": 180.00,
    "Laptop": 750.00,
    "Impresora": 120.00,
    "Auriculares": 35.00,
    "Microfono": 45.00,
    "Camara": 95.00,
    "Altavoces": 60.00,
    "USB": 10.00,
    "DiscoDuro": 85.00,
    "SSD": 110.00,
    "Router": 55.00,
    "Webcam": 40.00,
    "Tablet": 230.00,
    "Smartphone": 520.00,
    "Cargador": 18.00,
    "HDMI": 12.00,
    "PowerBank": 32.00,
    "TecladoMecanico": 70.00
}


def obtener_descuento():
    return random.randint(0, 25)


def calcular_precio_final(precio, descuento):
    return precio - (precio * descuento / 100)


def formatear_producto(nombre, precio):
    return f"{nombre:<15} ...... ${precio:.2f}"


def mostrar_catalogo(catalogo):
    for nombre, precio in catalogo.items():
        print(formatear_producto(nombre, precio))
