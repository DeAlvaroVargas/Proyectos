# main.py
import modulo as juego

def main():
    tablero = juego.crear_tablero()
    juego.colocar_barco(tablero)
    intentos_max = 15
    intentos = 0

    print("=== ¡Bienvenido a Hundir la Flota! ===")
    print("Tienes 15 intentos para hundir el barco de 3 casillas.")
    print("Símbolos: '-' = agua, 'O' = disparo al agua, 'X' = impacto.")
    print()

    while intentos < intentos_max:
        juego.mostrar_tablero(tablero)
        coord = input("Introduce una coordenada (Ej: A1): ").strip()
        pos = juego.traducir_coordenada(coord)
        
        if not pos:
            print(" Coordenada no válida. Usa formato A1 - J10.")
            continue

        fila, col = pos
        resultado = juego.disparar(tablero, fila, col)
        intentos += 1

        if resultado == "agua":
            print(" Agua...")
        elif resultado == "tocado":
            print(" ¡Has dado al barco!")
        elif resultado == "hundido":
            print(" ¡Hundiste el barco! ¡Ganaste!")
            break
        elif resultado == "ya_usado":
            print(" Ya habías disparado en esa posición. Intenta en otro lugar.")

    else:
        print("\n Se acabaron los intentos. Fin del juego.")

    print("\n--- TABLERO FINAL ---")
    juego.mostrar_tablero(tablero, mostrar_barco=True)

if __name__ == "__main__":
    main()
