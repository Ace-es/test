let matrix;
let solution;
let row_sum;
let max_in_row;
let co_ef_swapper;
let sol_swapper;
let initial;
let iterationResult;


document.getElementById("iteration").value = 1;
document.getElementById("answerID").style.display = "none";

function printmatrix() {
  console.log(matrix);
  console.log(solution);
}

function printOnPage(text) {
  let elm = document.getElementById('answer');
  div = document.createElement('p');
  div.innerHTML = text;
  elm.appendChild(div);
}




function arrangerows() {
  for (let j = 0; j < matrix.length; j++) {
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][i] < matrix[j][i]) {
        //Swap co-efficient row by pointers
        co_ef_swapper = matrix[i];
        matrix[i] = matrix[j];
        matrix[j] = co_ef_swapper;

        sol_swapper = solution[i]; //Swap solution by values
        solution[i] = solution[j];
        solution[j] = sol_swapper;
      }
    }

  }

}


function calculate() {
  let iterations = 0;
  document.getElementById("credit").style.display = "none";
  document.getElementById("answerID").style.display = "block";
  document.getElementById("answer").innerHTML = "";
  //////////////////////////////////////input and converting into a 2d array/////////////////////////////////////////////////
  matrix = document.getElementById("Mat").value;
  solution = document.getElementById("Sol").value;
  iterationResult = document.getElementById("Intialvalues").value;
  iterations = document.getElementById("iteration").value;

  iterationResult = iterationResult.split(" ");
  solution = solution.split("\n");
  matrix = matrix.split("\n");
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = matrix[i].split(" ");
  }

  //////////////////////////////////////check for errors////////////////////////////////////////////////////////////////////////




  for (let i = 0; i < matrix.length; i++) {
    if (matrix.length != matrix[i].length) {
      alert("Please enter a valid matrix");
      return null;
    }
    if (matrix.length != solution.length) {
      alert("please enter a valid solution ");
      return null;
    }
    if (isNaN(solution[i])) {
      alert("please enter a valid solution");
      return null;
    }
    for (let j = 0; j < matrix.length; j++) {
      if (isNaN(matrix[i][j])) {
        alert("please enter a valid matrix");
        return null;
      }

    }
  }


  /////////////////////////////////////conversion from string to number/////////////////////////////////////////////////////// 
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      matrix[i][j] = Number(matrix[i][j]);
    }


  }

  for (let i = 0; i < matrix.length; i++) {
    solution[i] = Number(solution[i]);

  }
  //Matrix validity check
  for (let i = 0; i < matrix.length; i++) {
    row_sum = 0;
    max_in_row = matrix[i][0];

    for (let j = 0; j < matrix.length; j++) {
      row_sum = row_sum + matrix[i][j];

      if (matrix[i][j] > max_in_row) {
        max_in_row = matrix[i][j];
      }
    }

    if ((row_sum - max_in_row) > max_in_row) {
      alert("This system doesn't follow the jaccobi rule.");
      return null;
    }
  }



  arrangerows();

  console.log("This is the rearranged matrix");
  printmatrix();

  //Gauss Jaccobi
  let iteration_counter = 0;
  let rowSum = new Array(matrix.length);
  let oldIteration = new Array(matrix.length);

  while (iterations > 0) {

    for (let k = 0; k < matrix.length; k++) {
      oldIteration[k] = iterationResult[k]; //save past iteration in another array
      rowSum[k] = 0;
    }

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (j != i) //Ignore principal diagonal
        {
          rowSum[i] = rowSum[i] + (matrix[i][j] * oldIteration[j]);
        } //calculate sum part

        iterationResult[i] = (1 / matrix[i][i]) * (solution[i] - rowSum[i]); //result of iteration calculation
      }
    }

    iterations--;
  }



  printexplation();
  printOnPage("\n");

  printOnPage("The solution is:\n")
  for (let i = 0; i < matrix.length; i++) {
    printOnPage("X" + (i + 1) + " = " + iterationResult[i].toFixed(10));
  }


  for (let i = 0; i < matrix.length; i++) {
    iterationResult[i] = 0;
  }
}

function printexplation() {
  printOnPage("The first step is to sort the array:\n");
  for (let i = 0; i < matrix.length; i++) {
    let row = '';
    for (let j = 0; j < matrix.length; j++) {
      row += matrix[i][j]+"x<sub>"+(j+1)+"</sub>";
      row+="\t";

    }
    row += "= "+solution[i];
    printOnPage(row);
  }

  printOnPage("The second step is to create the equations using Guass Jaccobi on the matrix:\n");
  for (let i = 0; i < matrix.length; i++) {
    let answer = '';
    answer += `X<sub>${(i + 1)}` + "</sub> =<sup> 1</sup>&frasl;<sub> " + (matrix[i][i]) + "</sub> ( ";
    let coffecientcounter = 1

    for (let j = 0; j < matrix.length; j++) {

      if (solution[i] == 0) {} else if (j == 0) {
        if (solution[i] < 0) {
          answer += ("-" + (-1 * solution[i]));
        } else {
          answer += ((solution[i]));
        }
      }

      if (i == j) {
        answer += ("+0 x<sub>" + (coffecientcounter)+"</sub>");
      } else if (matrix[i][j] >= 0) {
        answer += ("+" + (matrix[i][j]) + " x<sub>" + (coffecientcounter)+"</sub>");
      } else {
        answer += ("-" + (-1 * matrix[i][j]) + " x<sub>" + (coffecientcounter)+"</sub>");
      }

      coffecientcounter++;

    }
    answer += ")";
    printOnPage(answer);
    printOnPage('\n')
  }


}



function Clear() {


  document.getElementById("Mat").value = null;
  document.getElementById("Sol").value = null;
  document.getElementById("iteration").value = 1;
  document.getElementById("answer").innerHTML = "";
  document.getElementById("credit").style.display = "block";
  document.getElementById("Intialvalues").value = null;
  document.getElementById("answerID").style.display = "none";
}
