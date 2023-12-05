const apply = document.querySelector(".dataWrapper > button:nth-of-type(1)");
const reset = document.querySelector(".dataWrapper > button:nth-of-type(2)");
const insert = document.querySelector(".dataWrapper > input:nth-of-type(1)");
const remove = document.querySelector(".dataWrapper > input:nth-of-type(2)");
const counterPrint = document.querySelector("body > p:nth-of-type(1)");
const names = document.querySelector("body > p:nth-of-type(2)");
let persons = ['강건희', '강다솜', '김건우', '김나영', '김담향', '김동일', '김수호', '김태영', '명하영', '모대헌',
               '박정현', '유준하', '윤여록', '이승찬', '이윤주', '이재빈', '임태환', '장성호', '조가영', '조정아'];
let counter = 20;
const [bannedNum, bannedSeat] = [1, 8];
const seatNum = 28-bannedNum;

names.textContent = persons.join(', ');
counterPrint.textContent = '현 인원: '+counter+'명';

apply.addEventListener("click", () => {
    benchClear();

    if (persons.length != 0) {
        let randomLength = persons.length;
        let randomNumbers = [];

        // 사람 수와 같은 랜덤 수 생성(1~28사이, 8제외(없는자리))
        while (randomNumbers.length < randomLength) {
            let number = Math.floor(Math.random() * (seatNum+bannedNum)) + 1;

            if (!randomNumbers.includes(number) && number!=bannedSeat) {
                randomNumbers.push(number);
            }
        }
        let sortPersons = persons.slice();
        sortPersons.sort(() => Math.random() - 0.5);

        // 배치
        for (let i=0; i<sortPersons.length; i++) {
            let setSeat = document.querySelector(`.wrapper > div:nth-of-type(${randomNumbers[i]})`);

            setSeat.innerHTML = sortPersons[i];
            setSeat.style.backgroundColor = "rgb(138, 183, 49)";
        }
    }
    else {
        alert("사람 없음");
    }
});
reset.addEventListener("click", () => {
    // 모든 데이터 삭제
    persons.length = 0;
    counter = 0;
    names.textContent = persons.join(', ');
    counterPrint.textContent = '현 인원: '+counter+'명';
});

insert.addEventListener("keyup", (event) => {
    // 엔터키로 데이터 입력
    if (event.key == 'Enter') {
        // 최대자리수 확인
        if (counter < seatNum) {
            if (!persons.includes(insert.value)) {
                persons.push(insert.value);
                counter++;
                names.textContent = persons.join(', ');
                counterPrint.textContent = '현 인원: '+counter+'명';
            }
            else {
                alert("있는 사람");
            }
            insert.value = '';
        }
        else {
            alert("정원 초과");
        } 
    }
});
remove.addEventListener("keyup", (event) => {
    // 엔터키로 데이터 삭제
    if (event.key == 'Enter') {
        if (persons.includes(remove.value)) {
            persons = persons.filter((person) => person!=remove.value);
            counter--;
            names.textContent = persons.join(', ');
            counterPrint.textContent = '현 인원: '+counter+'명';
        }
        else {
            alert("없는 사람");
        }
        remove.value = '';
    }
});

function benchClear() {
    let seat = document.querySelectorAll(".wrapper > div");

    for(let i=0; i<(seatNum+bannedNum); i++) {
        if (i != 7) {
            seat[i].innerHTML = '';
            seat[i].style.backgroundColor = "rgb(207, 232, 220)";
        }
    }
}