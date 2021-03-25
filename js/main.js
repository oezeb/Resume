var langTable, langGraph, langList, levelList;

langTable = document.getElementById('lang-table');
langGraph = langTable.insertAdjacentElement('beforebegin',document.createElement('div'));
langGraph.id = 'lang-graph';
langGraph.style.padding = '1em 0';

langList = langTable.getElementsByClassName('lang');
levelList = langTable.getElementsByClassName('level');

for(let i = 0; i < langList.length && i < levelList.length; i++) {
    let lang = createLang(langList[i].innerHTML);
    lang.addEventListener("click",function() { fadeIn(lang);});

    let level = createLevel(levelList[i].innerHTML);

    let row = langGraph.appendChild(document.createElement('div'));
    row.style.margin = '0.2em 0';
    row.style.display = 'flex';
    row.append(lang, level);
}

langTable.style.display='none';

/*
 * functions 
 */

function fadeIn(el, display){
    el.style.opacity = 0;
    el.style.display = display || "block";
  
    (function fade() {
      var val = parseFloat(el.style.opacity);
      if (!((val += .1) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  };

function countAnimation(textBox, colorBox=null) {
    var t = null;
    clearInterval(t);
    var initVal = textBox.innerHTML.slice(0,textBox.innerHTML.length-1);
    var val = 0;
    t = setInterval(setText, 10);
    function setText() {
        if(val > initVal) {
            clearInterval(t);
        } 
        else {
            textBox.innerHTML = colorBox==null || val >= 10 ? val + '%' : '';
            if(colorBox) colorBox.style.width = val + '%';
            ++val;
        }
    }
}

function createLang(text) {
    var lang = document.createElement('div');
    lang.innerHTML = text;
    lang.style.width='20%';
    lang.style.padding = '0.2em 1em';
    lang.style.textAlign = 'end';
    return lang;
}

function createLevel(percent) {
    var level = document.createElement('div');
    level.style.width = '80%';

    var colorBox = level.appendChild(document.createElement('div'));
    colorBox.style.width = percent;
    colorBox.style.height = '60%';
    colorBox.style.backgroundColor = '#548AB7'

    var textBox = colorBox.appendChild(document.createElement('div'));
    textBox.innerHTML = percent;
    textBox.style.width = 'fit-content';
    textBox.style.background = 'none';
    textBox.style.margin = 'auto';
    textBox.style.fontSize = '0.75em';
    textBox.style.color = '#ffffff';
    textBox.addEventListener("mouseover",function () { countAnimation(textBox); });

    countAnimation(textBox, colorBox)
    textBox.addEventListener("scroll", function () {countAnimation(textBox, colorBox); });
    
    return level;
}