import sys
from inventario import CATALOGO, obtener_descuento, calcular_precio_final, mostrar_catalogo


def main():

    
    try:
        presupuesto_inicial = float(sys.argv[1])
    except (IndexError, ValueError):
        print("Error: Presupuesto inválido o no introducido. Se usará 0.")
        presupuesto_inicial = 0.0

    # Variables de estado
    presupuesto_actual = presupuesto_inicial
    carrito = []
    descuento_dia = obtener_descuento()
    continuar = True
    opcion_elegida = ""
    total_gastado = 0.0

    print("--- BIENVENIDO A LA TIENDA ---")
    print(f"Presupuesto inicial: ${presupuesto_inicial:.2f}")
    print(f"Descuento de hoy: {descuento_dia}%")

    # Bucle principal while
    while continuar:

        print("\nOpciones:")
        print("1. Ver Catálogo")
        print("2. Agregar Producto")
        print("3. Terminar Compra")

        opcion_elegida = input("> ")

        if opcion_elegida == "1":

            mostrar_catalogo(CATALOGO)

        elif opcion_elegida == "2":

            nombre_producto = input("Ingrese nombre del producto: ")

            
            if nombre_producto in CATALOGO and presupuesto_actual >= CATALOGO[nombre_producto]:

                precio_original = CATALOGO[nombre_producto]
                precio_pagado = calcular_precio_final(precio_original, descuento_dia)

                carrito.append((nombre_producto, precio_pagado))
                presupuesto_actual -= precio_pagado

                print(f"¡{nombre_producto} agregado!")

            else:
                print(f"Error: '{nombre_producto}' no está en el catálogo o no tienes presupuesto.")

        elif opcion_elegida == "3":

            continuar = False

        else:
            print("Opción inválida.")

    print("\n--- TICKET FINAL ---")

    total_gastado = 0

    
    for i, producto in enumerate(carrito, start=1):
        nombre, precio = producto
        print(f"{i}. {nombre:<15} ...... ${precio:.2f}")
        total_gastado += precio

    print("--------------------")
    print(f"Total Bruto: ${total_gastado:.2f}")

    total_con_descuento = total_gastado
    print(f"Total con Descuento ({descuento_dia}%): ${total_con_descuento:.2f}")
    print(f"Presupuesto Restante: ${presupuesto_actual:.2f}")



if __name__ == "__main__":
    main()
