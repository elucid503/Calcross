const WordsAndDefinitions = [

    ["Limit", "The value that a function approaches as the input approaches a specific value or infinity."],
    ["Continuity", "A property of a function where it is continuous, meaning it has no breaks, gaps, or holes in its graph."],
    ["Derivative", "A measure of how a function changes as its input changes, representing the slope of the tangent line to the function's graph."],
    ["Integral", "A fundamental concept in calculus that represents the area under a curve or the accumulation of a quantity over an interval."],
    ["Chain Rule", "A rule used to differentiate a composite function by taking the derivative of the outer function and multiplying it by the derivative of the inner function."],
    ["Product Rule", "A rule used to differentiate the product of two functions by taking the derivative of each function and adding their products."],
    ["Quotient Rule", "A rule used to differentiate the quotient of two functions by taking the derivative of each function and subtracting their products, divided by the square of the denominator function."],
    ["Inflection", "A point on a curve where the function changes concavity or the second derivative changes sign."],
    ["Asymptote", "A line that a function approaches but never touches as the input approaches infinity or negative infinity."],
    ["Antiderivative", "A function whose derivative is equal to a given function."],
    ["Convergence", "A property of a series or sequence where it approaches a finite limit as the number of terms increases."],
    ["Divergence", "A property of a series or sequence where it does not approach a finite limit as the number of terms increases."],
    ["Substitution", "A method used to evaluate integrals by replacing the letiable with a new letiable, simplifying the integral."],
    ["Extrema", "The maximum and minimum values of a function over a specified interval."],
    ["Rolle's Theorem", "A theorem stating that if a function is continuous on a closed interval and differentiable on the open interval, and has equal values at the endpoints, then there exists at least one point in the open interval where the derivative is zero."],
    ["L'Hopital's Rule", "A rule used to evaluate the limit of a quotient of two functions when the limit of the numerator and denominator is either zero or infinity, by taking the limit of the quotient of their derivatives."],
    ["Tangent Line", "A straight line that touches a curve at a single point and has the same slope as the curve at that point."],
    ["Normal Line", "A straight line that is perpendicular to the tangent line at the point of tangency on a curve."],
    ["Secant Line", "A straight line that intersects a curve at two or more points."],
    ["Cotangent", "The reciprocal of the tangent function in trigonometry, equal to the ratio of the adjacent side to the opposite side in a right triangle" ],
    ["Cosecant", "The reciprocal of the sine function in trigonometry, equal to the ratio of the hypotenuse to the opposite side in a right triangle."],
    ["Domain", "The set of all possible input values for a function."],
    ["Range", "The set of all possible output values for a function."],
    ["Endpoint", "A point at the beginning or end of a line segment or interval."],
    ["Slope", "A measure of the steepness of a line, equal to the ratio of the vertical change to the horizontal change between any two points on the line."],
    ["Amplitude", "The maximum displacement of a periodic function from its mean value."],
    ["Frequency", "The number of complete cycles or oscillations of a periodic function in a unit of time or space."],
    ["Midline", "A horizontal line that represents the average value of a periodic function over one period."],
    ["Discontinuity", "A point at which a function is not continuous, meaning there is a break, gap, or hole in its graph."],
    ["Optimization", "The process of finding the maximum or minimum value of a function, often used to solve real-world problems."],
    ["Riemann Sum", "A method for approximating the definite integral of a function by summing the areas of rectangles or trapezoids over an interval."],
    ["Position", "The location of an object at time t."],
    ["Acceleration", "The rate of change of velocity at time t."],
    ["Velocity", "The rate of change of postion at time t."],
    ["Speed", "The absolute value or magnitude of velocity at time t."],
    ["Jerk", "The rate of change of acceleration at time t."],
    ["NaturalLog","A logarithm with base e."],
    ["PowerRule", "A method of finding a derivative for a function."],
    ["Implicit","A method of differentiation on a function with a y variable."],
    ["SlopeField", "A graphical representation of the slope of a differential equation at every coordinate point."],
    ["Optimization", "The process of finding the maximum or minimum value of a function subject to certain constraints."],
    ["RelatedRates", "The process of finding the rate of change of one variable with respect to another variable using the chain rule."],
    ["DifferentialEquation", "An equation that involves an unknown function and one or more of its derivatives, which relates the behavior of the function to its rate of change, and is typically used to model physical and natural phenomena."],
    ["Volume", "The amount of space occupied by a three-dimensional object, and can be found by integrating the cross-sectional area of the object over a given interval along the direction of its height or depth."],
    ["FTC", "The acronym representing the theorem that describes the relationship between differentiation and integration."]
]

function getRandomElements(arr, count) {

  const shuffled = [...arr];
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);

}

function sortByNumberProperty(arr, property) {
  return arr.sort((a, b) => a[property] - b[property]);
}

function Generate() { 

    let board, wordArr, wordBank, wordsActive, mode;
    let xMatches = 0; let yMatches = 0;
    
    let xWords = { }
    let yWords = { }

    const Bounds = {  
      
      top:500, right:0, bottom:0, left:500,
    
      Update: function (x, y) {
        
        this.top = Math.min(y,this.top);
        this.right = Math.max(x,this.right);
        this.bottom = Math.max(y,this.bottom);
        this.left = Math.min(x, this.left);
        
      },
      
      Clean: function () {
        
        this.top = 500;
        this.right = 0;
        this.bottom = 0;    
        this.left = 500;

      }

    }
    
    function Play() {
      
      let letterArr = document.getElementsByClassName('letter');
      
      for (let i = 0; i < letterArr.length; i++){
        
        letterArr[i].innerHTML = "<input class='char' type='text' maxlength='1'></input>";

      }
      
      mode = 0;
      ToggleInputBoxes(false);

    }
    
    function Create() {
      
      if (mode === 0) {
        
        ToggleInputBoxes(true);
        document.getElementById("crossword").innerHTML = BoardToHtml(" ")
        mode = 1;

      }

      else {  
        
        AssignWords();
        
        let isSuccess = true
    
        for (let i = 0, isSuccess = false; i < 10 && !isSuccess; i++){
          
          Cleanlets();

          isSuccess = PopulateBoard();

        }
    
        document.getElementById("crossword").innerHTML = (isSuccess) ? BoardToHtml(" ") : "Failed to find crossword.";
        
      }
    }
    
    
    function ToggleInputBoxes(active){
      
      let w= document.getElementsByClassName('word')
      let d = document.getElementsByClassName('clue')
      
      for (let i = 0; i < w.length; i++){
        
        if (active === true) {
          
          RemoveClass(w[i], 'hide');
          RemoveClass(d[i], 'clueReadOnly');
          d[i].disabled = '';

        }

        else {
          
          AddClass(w[i], 'hide');
          AddClass(d[i], 'clueReadOnly');
          d[i].disabled = 'readonly';

        }
      }
    }
    
    function AssignWords(){
      
        wordArr = [];  
        let index = 0
              
        let elements = getRandomElements(WordsAndDefinitions, 7);
            
        for (const [word, _definition] of elements) {
            if (index < 7) wordArr.push(word);
            index += 1;
        }

    }
    
    
  function Cleanlets() {
      
    Bounds.Clean();

    xMatches = 0;
    yMatches = 0;

    xWords = {}
    yWords = {}
    
    wordBank = [];
    
    wordsActive = [];
    
    board = [];
    
    for (let i = 0; i < 32; i++){
        
        board.push([]);
        for(let j = 0; j < 32; j++){
          board[i].push(null);
      }
      
    }
    
  }

  function PopulateBoard() {
      
      PrepareBoard();

      let isOk = true;
      
      for (let i = 0, isOk = true, len = wordBank.length; i < len && isOk; i++){
        
        isOk = AddWordToBoard();

    }  
    
    return isOk;
    
  }

  function PrepareBoard() {
      
      wordBank=[];
      
    for (let i = 0, len = wordArr.length; i < len; i++){
        
      wordBank.push(new WordObj(wordArr[i]));
      
    }
    
      
    for (i = 0; i < wordBank.length; i++){
        
      for (let j = 0, wA = wordBank[i]; j < wA.char.length; j++){
          
        for (let k = 0, cA = wA.char[j]; k < wordBank.length; k++){
            
          for (let l = 0, wB = wordBank[k]; k !== i && l < wB.char.length; l++){
              
            wA.totalMatches += (cA === wB.char[l]) ? 1 : 0;
            
            }
        }
        
      }
      
    }  
    
  }
  
  function AddWordToBoard() {

    let i, len, curIndex, curWord, curChar, testWord, testChar, 
        
      minMatchDiff = 9999, curMatchDiff;  
    
    if (wordsActive.length < 1) {
        
      curIndex = 0;
      
      for (i = 0, len = wordBank.length; i < len; i++){
          
          if (wordBank[i].totalMatches < wordBank[curIndex].totalMatches){
            curIndex = i;

        }
        
      }
      
      wordBank[curIndex].successfulMatches = [{ x: 12, y: 12, dir: 0 }];
      
    }
    
    else {  
      
      curIndex = -1;
      
      for (i = 0, len = wordBank.length; i < len; i++){
          
        curWord = wordBank[i];
        
        curWord.effectiveMatches = 0;
        
        curWord.successfulMatches = [];
        
        for (let j = 0, lenJ = curWord.char.length; j < lenJ; j++){
            
          curChar = curWord.char[j];
          
          for (let k = 0, lenK = wordsActive.length; k < lenK; k++){
              
            testWord = wordsActive[k];
            
            for (let l = 0, lenL = testWord.char.length; l < lenL; l++){
                
              testChar = testWord.char[l];            
              
              if (curChar === testChar) {
                  
                curWord.effectiveMatches++;
                
                let curCross = { x: testWord.x, y: testWord.y, dir: 0 };       
                
                if (testWord.dir === 0) {                
                    
                  curCross.dir = 1;
                  
                  curCross.x += l;
                  
                  curCross.y -= j;
                  
                } 
                
                else {
                  
                  curCross.dir = 0;
                  
                  curCross.y += l;
                  
                  curCross.x -= j;
                  
                }
                
                let isMatch = true;
                
                for (let m = -1, lenM = curWord.char.length + 1; m < lenM; m++){
                    
                  let crossVal = [];
                  
                  if (m !== j) {
                      
                    if (curCross.dir === 0) {
                        
                      let xIndex = curCross.x + m;
                      
                      if (xIndex < 0 || xIndex > board.length) {
                          
                        isMatch = false;
                        
                        break;
                        
                      }
                    
                      if (board[xIndex]) {
                                                  
                        crossVal.push(board[xIndex][curCross.y]);
                        
                        crossVal.push(board[xIndex][curCross.y + 1]);
                        
                        crossVal.push(board[xIndex][curCross.y - 1]);
                        
                          
                      }
                      
                      else { 

                      }
                    
                    }
                  
                    else {
                        
                        let yIndex = curCross.y + m;
                        
                      if (yIndex < 0 || yIndex > board[curCross.x].length) {
                          
                        isMatch = false;
                        
                        break;
                        
                      }
                    
                      crossVal.push(board[curCross.x][yIndex]);
                      
                      crossVal.push(board[curCross.x + 1][yIndex]);
                      
                      crossVal.push(board[curCross.x - 1][yIndex]);
                      
                    }
    
                    if (m > -1 && m < lenM - 1) {
                        
                      if (crossVal[0] !== curWord.char[m]) {
                          
                        if (crossVal[0] !== null) {
                            
                          isMatch = false;
                            
                          break;

                        }

                        else if (crossVal[1] !== null) {
                          
                          isMatch = false;
                          break;
                          
                        }
                          
                          else if (crossVal[2] !== null) {
                            
                            isMatch = false;                  
                            break;
                        }
                       
                      }

                    }

                    else if (crossVal[0] !== null) {
                      
                      isMatch = false;    
                      
                      break;
                      
                    }
                    
                  }
                  
                }           
                  
                if (isMatch === true) {      
                    
                    curWord.successfulMatches.push(curCross);
                }
                
              }
              
            }
            
          }
          
        }
        
        curMatchDiff = curWord.totalMatches - curWord.effectiveMatches;
          
        if (curMatchDiff < minMatchDiff && curWord.successfulMatches.length > 0) {
            
          curMatchDiff = minMatchDiff;
          
          curIndex = i;
          
        }
        
        else if (curMatchDiff <= 0) {
          
          return false;
          
        }
        
      }
      
    }
    
    if (curIndex === -1) {
        
      return false;
      
    }
        
    let spliced = wordBank.splice(curIndex, 1);
    
    wordsActive.push(spliced[0]);
    
    let pushIndex = wordsActive.length - 1,
        
    rand = Math.random(),
        
    matchArr = wordsActive[pushIndex].successfulMatches,
        
    matchIndex = Math.floor(rand * matchArr.length), 
        
    matchData = matchArr[matchIndex];
      
    wordsActive[pushIndex].x = matchData.x;
    
    wordsActive[pushIndex].y = matchData.y;
    
    wordsActive[pushIndex].dir = matchData.dir;
    
    for (i = 0, len = wordsActive[pushIndex].char.length; i < len; i++){
        
      let xIndex = matchData.x,
          
      yIndex = matchData.y;
      
      if (matchData.dir === 0) {
          
        xIndex += i;

        if (i === 0) {
          xMatches += 1
          board[xIndex - 1][yIndex] = `~${xMatches}`;

          xWords[wordsActive[pushIndex].string] = xMatches.toString()

        }
        
        board[xIndex][yIndex] = wordsActive[pushIndex].char[i];
        
      }
      
      else {
        
        yIndex += i;

        if (i === 0) {
          yMatches += 1
          board[xIndex][yIndex - 1] = `~${yMatches}`;

          yWords[wordsActive[pushIndex].string] = yMatches.toString()
          
        }
        
        board[xIndex][yIndex] = wordsActive[pushIndex].char[i];
        
      }
        
      Bounds.Update(xIndex, yIndex);
      
    }
        
    return true;
    
  }

    
  function BoardToHtml() {
      
    let str = "";
    
    for (var i = Bounds.top - 1; i < Bounds.bottom + 2; i++){
        
      str += "<div class='row'>";
      
      for (let j = Bounds.left - 1; j < Bounds.right + 2; j++){
          
        str += BoardCharToElement(board[j][i]);
        
      }
      
      str += "</div>";
      
    }

    return str;
    
  }
  
  function BoardCharToElement(c) {
      
    let arr = (c) ? ['square', 'letter'] : ['square'];
    
    if (c && c[0] === "~") {

      arr = ['square', 'indicator']
      c = c.slice(1)

    }

    return EleStr('div', [{ a: 'class', v: arr }], c);
    
  }
    
  function WordObj(stringValue) {
      
    this.string = stringValue;
    
    this.char = stringValue.split("");
    
    this.totalMatches = 0;
    
    this.effectiveMatches = 0;
    
    this.successfulMatches = [];  
    
  }
  
  function RegisterEvents() {
      
    document.getElementById("crossword").onfocus = function () { 
        
      return false;
    }
    
  }
  
  RegisterEvents();
  
  function EleStr(e, c, h) {
      
    h = (h) ? h : "";
    
    for (var i = 0, s = "<" + e + " "; i < c.length; i++){
        
      s += c[i].a + "='" + ArrayToString(c[i].v, " ") + "' ";    
      
    }
    
    return (s + ">" + h + "</" + e + ">");
    
  }
    
  function ArrayToString(a, s) {
      
    if (a === null || a.length < 1) return "";
    
    if (s === null) s = ",";
    
    for (var r = a[0], i = 1; i < a.length; i++){ r += s + a[i]; }
    
    return r;
    
  }
  
  function AddClass(ele, classStr) {
      
    ele.className = ele.className.replaceAll(' ' + classStr, '') + ' ' + classStr;
    
  }
  
    
  function RemoveClass(ele, classStr) {
      
    ele.className = ele.className.replaceAll(' ' + classStr, '');
    
  }
  
      
  String.prototype.replaceAll = function (replaceThis, withThis) {
      
    let re = new RegExp(replaceThis, "g"); 
    
    return this.replace(re, withThis);
    
  };
  
    
    let generateBtn = document.getElementById("generate")
    let answersBtn = document.getElementById("showKey")
    let buttonLabel = document.getElementById("buttonText")
    
    let generated = false
    let view = true

  generateBtn.addEventListener("click", function () {

    generated = true
      
    Cleanlets()
    mode = 1
    Create()
    Play()
            
    let cluesElement = document.querySelector('.clues')

    cluesElement.innerHTML = `<div class='clue-type'>Across</div>`
    
    for (const word of wordsActive.filter(w => w.dir === 0)) {
        
      let wordAndDef = WordsAndDefinitions.find(w => w[0] === word.string)

      let crossNumber = xWords[word.string]

      let element = document.createElement('div')
      element.className = 'clue'
      element.innerHTML = `<div> <div class="number">${crossNumber}</div><div class='def'>${wordAndDef[1]}</div></div>`
      cluesElement.appendChild(element)
      
    }
    
    cluesElement.innerHTML += `<div class='clue-type'>Down</div>`

    for (const word of wordsActive.filter(w => w.dir === 1)) {
        
      let wordAndDef = WordsAndDefinitions.find(w => w[0] === word.string)

      let crossNumber = yWords[word.string]

      let element = document.createElement('div')
      element.className = 'clue'
      element.innerHTML = `<div> <div class="number">${crossNumber}</div><div class='def'>${wordAndDef[1]}</div></div>`
      cluesElement.appendChild(element)
      
    }

  })

  answersBtn.addEventListener("click", function () {

    if (!generated) { 

      alert("Please generate a crossword first")
      return

    }

    if (view) {

      view = false 
      buttonLabel.innerHTML = "Hide Answers"

      Create()
      ToggleInputBoxes()
      
    }

    else { 
    
      view = true 
      buttonLabel.innerHTML = "View Answers"

      Play()

    }
    
  })

  
}
