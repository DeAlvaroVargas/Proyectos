# main.py

import modulo as mo

def main():
    while True:
        print("\n=== CALCULADORA ===")
        print("1. Suma (+)")
        print("2. Resta (-)")
        print("3. Multiplicación (*)")
        print("4. División (/)")
        print("5. Salir")

        opcion = input("Elige una opción (1-5): ")

        if opcion == '5':
            print("Saliendo del programa...")
            break

        if opcion not in ('1', '2', '3', '4'):
            print("Opción no válida. Intenta de nuevo.")
            continue

        try:
            num1 = float(input("Introduce el primer número: "))
            num2 = float(input("Introduce el segundo número: "))
        except ValueError:
            print("Entrada no válida. Debes ingresar números.")
            continue

        if opcion == '1':
            resultado = mo.sumar(num1, num2)
        elif opcion == '2':
            resultado = mo.restar(num1, num2)
        elif opcion == '3':
            resultado = mo.multiplicar(num1, num2)
        elif opcion == '4':
            resultado = mo.dividir(num1, num2)

        print(f"El resultado es: {resultado}")

if __name__ == "__main__":
    main()