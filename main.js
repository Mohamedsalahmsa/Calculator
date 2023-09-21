let keys = document.querySelectorAll(".key");
let inputElement = document.querySelector(".display .input");
let output = document.querySelector(".display .output");

let input = "";

for (let key of keys) {
    const value = key.dataset.key;

    key.addEventListener("click" , () => {
        if (value == "clear") {
            input = "";
            inputElement.innerHTML = "";   
            output.innerHTML = "";   
        } else if (value == "backspace") {
            input = input.slice(0 , -1);
            inputElement.innerHTML = CleanInput(input);
        } else if (value == "=") {
            let result = eval(prepare(input));
            output.innerHTML = cleanOutput(result);
        } else if (value == "brackets") {
            if (input.indexOf("(") == -1 || 
            input.indexOf("(") != -1 && 
            input.indexOf(")") != -1 && 
            input.lastIndexOf("(") < input.lastIndexOf(")")) 
            {
                input += "(";
            } else if (
            input.indexOf("(") != -1 && 
            input.indexOf(")") == -1 || 
            input.indexOf("(") != -1 &&
            input.indexOf(")") != -1 &&
            input.lastIndexOf("(") > input.lastIndexOf(")")            
            ) 
            {
                input += ")";
            }
            inputElement.innerHTML = CleanInput(input);
        } else {
            if (validate(value)) {
                input += value;
                inputElement.innerHTML = CleanInput(input);
            }
        }
    })
}

function CleanInput(input) {
    let inputArray = input.split("");
    let inputArrayLength = inputArray.length;

    for (let i = 0 ; i < inputArrayLength; i++) {
        if (inputArray[i] == "*") {
            inputArray[i] = `<span class="operator">x</span>`;
        } else if (inputArray[i] == "/") {
            inputArray[i] = `<span class="operator">÷</span>`;
        } else if (inputArray[i] == "+") {
            inputArray[i] = `<span class="operator">+</span>`;
        } else if (inputArray[i] == "-") {
            inputArray[i] = `<span class="operator">-</span>`;
        } else if (inputArray[i] == "(") {
            inputArray[i] = `<span class="brackets">(</span>`;
        } else if (inputArray[i] == ")") {
            inputArray[i] = `<span class="brackets">)</span>`;
        } else if (inputArray[i] == "%") {
            inputArray[i] = `<span class="percent">%</span>`;
        }
    }

    return inputArray.join("");
}

function cleanOutput(outputs) {
    let outputString = outputs.toString();
    let decimal = outputString.split(".")[1];
    outputString = outputString.split(".")[0];

    let outputArray = outputString.split("");

    if (outputArray.length > 3) {
        for (let i = outputArray.length - 3; i > 0 ; i++) {
            outputArray.splice(i , 0 , ",");
        }
    }

    if (decimal) {
        outputArray.push(".");
        outputArray.push(decimal);
    }

    return outputArray.join("");
}

function validate(value) {
    let lastInput = input.slice(-1);
    let operators = ["+" , "-" , "*" , "/"];
    if (value == "." && lastInput == ".") {
        return false;
    }

    if (operators.includes(value)) {
        if(operators.includes(lastInput)) {
            return false;
        } else {
            return true;
        }
    }
    return true;
}

function prepare() {
    let inpArray = input.split("");

    for (let i = 0; i < inpArray.length; i++) {
        if (inpArray[i] == "%") {
            inpArray[i] = "/100"
        }
    }
    return inpArray.join("");
}