const button = document.querySelectorAll(".wrapper > div");
const erase = document.querySelector("#erase");
const calc = document.querySelector("#calc");
const result = document.querySelector("h1");
let inputData = '';

button.forEach((event) => {
    event.addEventListener("mousedown", (push) => {
        push.target.style.backgroundColor = "rgb(79, 185, 227)";
    })
});
button.forEach((event) => {
    event.addEventListener("mouseleave", (push) => {
        push.target.style.backgroundColor = "rgb(207, 232, 220)";
    })
});
button.forEach((event) => {
    event.addEventListener("mouseup", (push) => {
        const targetId = push.target.id;
        
        push.target.style.backgroundColor = "rgb(207, 232, 220)";

        // 데이터의 첫번째 값은 기호금지
        if (targetId[0]!='s' || inputData!='') {
            // 기호가 연속으로 올 때 이전 기호 삭제
            if (targetId[0]=='s' && (inputData[inputData.length-1]=='+'||inputData[inputData.length-1]=='-'||inputData[inputData.length-1]=='*'||inputData[inputData.length-1]=='/')) {
                inputData = inputData.slice(0,-1);
            }
            // 데이터에 문자 넣기
            inputData += targetId[1];
            result.textContent = inputData;
        }
    })
});

erase.addEventListener("click", () => {
    inputData = '';
    result.textContent = inputData;
});
calc.addEventListener("click", () => {
    // 아무것도 없이 계산을 눌렀을 때 0출력
    if (inputData == '') {
        result.textContent = 0;
    }
    else {
        // 데이터의 마지막이 기호일 경우 제거
        if (inputData[inputData.length-1]=='+' || inputData[inputData.length-1]=='-' || inputData[inputData.length-1]=='*' || inputData[inputData.length-1]=='/') {
            inputData = inputData.slice(0,-1);
        }

        let numberArr = inputData.split(/[+\-*/]/g);
        let signArr = inputData.match(/[^0-9]+/g);
        let idx;
        // 문자의 숫자화
        for (let i=0; i<numberArr.length; i++) {
            numberArr[i] = parseFloat(numberArr[i]);
        }
        // 하나의 숫자만 입력되었을 때(=> 기호가 없을 때)
        if (signArr == null) {
            result.textContent = numberArr[0];
        }
        else {
            // *, / 처리 (사칙연산 우선순위)
            idx = 0;
            while (idx < signArr.length) {
                if (signArr[idx]=='*') {
                    numberArr[idx] = numberArr[idx] * numberArr[idx+1];
                    numberArr.splice(idx+1,1);
                    signArr.splice(idx,1);
                    idx--;
                }
                else if (signArr[idx]=='/') {
                    if (numberArr[idx+1] == 0) {
                        alert("Zero Divide Error");
                        break;
                    }
                    numberArr[idx] = numberArr[idx] / numberArr[idx+1];
                    numberArr.splice(idx+1,1);
                    signArr.splice(idx,1);
                    idx--;
                }
                idx++;
            }
            // +, - 처리
            idx = 0;
            while (idx < signArr.length) {
                if (signArr[idx]=='+') {
                    numberArr[idx] = numberArr[idx] + numberArr[idx+1];
                    numberArr.splice(idx+1,1);
                    signArr.splice(idx,1);
                    idx--;
                }
                if (signArr[idx]=='-') {
                    numberArr[idx] = numberArr[idx] - numberArr[idx+1];
                    numberArr.splice(idx+1,1);
                    signArr.splice(idx,1);
                    idx--;
                }
                idx++;
            }
            result.textContent = numberArr[0];
        }
        inputData = numberArr[0];
    }
});