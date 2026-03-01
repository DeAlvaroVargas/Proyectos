const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentValue = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {

        if (button.id === "clear") {
            currentValue = "";
            display.value = "";
            return;
        }

        if (button.id === "equals") {
            try {
                currentValue = eval(currentValue);
                display.value = currentValue;
            } catch {
                display.value = "Error";
                currentValue = "";
            }
            return;
        }

        currentValue += button.dataset.value;
        display.value = currentValue;
    });
});
