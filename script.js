const gameboard = document.getElementById('gameboard');
const resetBtn = document.getElementById('resetBtn');

const options = ['flower','boy','mouse','bear','mic','golf','fish','camera','moon','horse','train','car',
    'poio','soccer','ski','sun','cat','heart'];
let firstPick = null;
let lockBoard = false;

resetBtn.addEventListener('click', () =>{
    firstPick = null;
    gameboard.innerHTML = '';
    createButtons();
})
function randomArray() {
    let copyArray = [...options,...options];
    copyArray = shuffleArray(copyArray);
    return copyArray;
}
function shuffleArray(toShuffle){
    for(let i = toShuffle.length-1;i>0;i--){
        let randomPosition = Math.floor(Math.random() * (i + 1));
        let temp = toShuffle[i];
        toShuffle[i] = toShuffle[randomPosition];
        toShuffle[randomPosition] = temp;
    }
    return toShuffle;
}
function gameLogic(one, two) {
    if (one.name === two.name){
        one.element.classList.remove('bg-neutral-400');
        two.element.classList.remove('bg-neutral-400');
        one.element.disabled = true;
        two.element.disabled = true;
        showSvg(one.element,one.name);
        showSvg(two.element,two.name);
    }
    else{
        hideSvg(one.element);
        hideSvg(two.element);
    }
}
function showSvg (btn,itemName){
    btn.innerHTML = 
        `
        <svg width="50" height="50">
            <use href="/sprite.svg#${itemName}"></use>
        </svg>
    `;
}
function hideSvg(btn){
    btn.innerHTML = '';
}
function createButtons(){
    const elements = randomArray();
    //console.log(elements);
    elements.forEach(itemName =>{
        const btn = document.createElement('button');
        btn.className = 'flex justify-center bg-neutral-400 p-3 rounded w-[70px] h-[70px]';

        gameboard.appendChild(btn);
        btn.addEventListener('click' ,()=>{
            if(lockBoard) return;
            if(firstPick===null){
                firstPick = {
                    name : itemName,
                    element : btn
                }
                showSvg(firstPick.element,itemName);
                return;
            }
            if (firstPick.element === btn) return;
            lockBoard = true;
            showSvg(btn,itemName)
            setTimeout(() => {
                gameLogic(firstPick, {name: itemName, element: btn});
                lockBoard = false;
                firstPick = null;
            }, 500);
        })
    });
}

createButtons();