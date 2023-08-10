let a = '';
let b = '';
let sign = '';
let editing = true;

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const signs = ["+", "-", "X", "/"];

const display = document.querySelector(".calc-screen p");

function ClearAll() {
    a = ''
    b = ''
    sign = ''
    editing = true
    display.textContent = 0
}
function isValid(a)
{
    return a.toString().length<8
}
function formatNumber(number) {
    const parsedNumber = parseFloat(number);
  
    if (Number.isInteger(parsedNumber)) {
      return parsedNumber.toString();
    }
  
    // Check if the number exceeds 1,000,000
    if (Math.abs(parsedNumber) >= 1000000) {
      const formattedNumber = parsedNumber.toExponential(4);
      return formattedNumber;
    }
  
    // Limit the number to 6 decimal places
    const roundedNumber = parsedNumber.toFixed(6);
  
    // Remove trailing zeros only if the number has a decimal part
    
    const trimmedNumber = roundedNumber.replace(/(\.\d*?[1-9])0+$/, '$1');
  
    return trimmedNumber;
  }
document.querySelector(".buttons").onclick = (event) => {
    if (!event.target.classList.contains('btn')) return;
    //hammasini tozalash
    if (event.target.classList.contains('ac')) {
        ClearAll();
        return;
    }
    // 1ta belgi o'chirish
    if (event.target.classList.contains('del')) {
        if (editing) {
            if(display.textContent==='NaN')
            {
                a=''
                display.textContent='0';
            }
            else if (sign.length === 0) {
                a = a.slice(0, -1);
                display.textContent = a;
            }
            else if (sign !== '') {
                b = b.slice(0, -1);
                display.textContent = b;
            }
        
        return;
        }
    }
    //plus-minus
    if (event.target.classList.contains('plus-minus')) {
        if (editing === true) {
            if (sign.length === 0) {
                a = parseFloat(a) * -1;
                display.textContent = a;
            } else if (b !== '') {
                b = parseFloat(b) * -1;
                display.textContent = b;
            }
        }
        return;
    }
    // % belgisini kiritish
    if (event.target.classList.contains('percent')) {
        if (sign === '') {
            a = parseFloat(a) / 100;
            a = formatNumber(a);
            display.textContent = a;
        }
        else {
            b = parseFloat(b) / 100;
            b = formatNumber(b);
            display.textContent = b;
        }
        if (display.textContent === 'NaN') {
            display.textContent = '0'
        }
        return
    }
    const key = event.target.textContent;
    if (digits.includes(key)) {
        if (isValid(a) && sign === '') {
            if (editing === false) {
                a = key;
                display.textContent = a;
                editing = true;
            } else {
                if (key === '.' && !a.includes('.')) {
                a += key;
                } else if (key !== '.') {
                a += key;
                a = formatNumber(a);

                }
                display.textContent = a;
            }
            } else if (isValid(b) && sign !== '') {
            if (key === '.' && !b.includes('.')) {
                b += key;
            } else if (key !== '.') {
                b += key;
                b = formatNumber(b);

            }
            display.textContent = b;
            }
            console.table(a, sign, b);
            return;
    }
    if (signs.includes(key)) {
        display.textContent = '';
        sign = key;
        display.textContent = sign;
        console.table(a, sign, b);
        return;
    }
    if (key === '=') {
        switch (sign) {
            case '+':
                a = (+a) + (+b);
                break;
            case '-':
                a = a - b;
                break;
            case 'X':
                a = a * b;
                break;
            case '/':
                //ba'zi matematik formulaga ko'ra 0ga bo'lsa cheksiz bo'ladi
                a = a / b;
                break;
            default:
                break;
        }
        editing = false;
        a = formatNumber(a)
        display.textContent = a;
        a = ''
        b = ''
        sign = ''
        console.table(a, sign, b);
        return
    }
}
