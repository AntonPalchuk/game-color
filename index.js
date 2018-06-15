function getCoords(item,direction,arr) {
  var obj = {
    up:{
      y: 0,
      x: -1
    },
    down:{
      y: 0,
      x: 1
    },
    left:{
      y: -1,
      x: 0
    },
    right:{
      y: 1,
      x: 0
    }
  }
  var newPositionX = item.x + obj[direction].x;
  var newPositionY = item.y + obj[direction].y;
  if((newPositionX < 0||newPositionX > arr.length - 1)||(newPositionY < 0||newPositionY > arr.length - 1)){
    return {};
  }else{
    return arr[newPositionX][newPositionY];
  }
}

function generateColors(i,j){

  return Math.random() > 0.5?"white":"black"
}

function getReverseColor(color) {
  var objColor = {
    white:"black",
    black:"white"
  }
  return objColor[color]
}

function createInitialArr(rows,cols){
  var arrMain = [];
  for(var i = 0;i < rows;i++){
    var arrInner = [];
    arrMain.push(arrInner);
    for(var j = 0;j < cols;j++){
      var object = {
        x: i,
        y: j,
        color: generateColors(i,j)
      }
      arrMain[i].push(object);
    }
  }
  return arrMain;
}


function drawArr(arr) {
  var div = document.getElementById("div"),
      table = document.getElementById("table");

  div.classList.add("none");
  table.innerHTML = "";
  for(var i = 0;i < arr.length;i++){
    var item = arr[i],
        tr = document.createElement("tr");
    for(var j = 0;j < item.length;j++){
      var td = document.createElement("td");
      td.addEventListener("click",function(cellObject,e){
      var newArr = changeColor(cellObject,arr);
       drawArr(newArr);
       allColorSectorsAndCounter(arr);

    }.bind(this,item[j]));

      td.classList.add(item[j].color);
      setTimeout(function(td){td.classList.add("td");},200,td)

      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

function allColorSectorsAndCounter(arr){
  var innerCounter = counter();
  var white = 0;
  var black = 0;
  for(var i = 0; i < arr.length;i++){
    var couls = arr[i];
    for(var j = 0;j < couls.length;j++){
      if(arr[i][j].color === "white"){
        white++;
        }else{
          black++;
        }
      }
    }
    if(innerCounter > 0&&innerCounter === 1){
      timeStart = Date.now();
      console.log(timeStart);
    }
  if(white === i*j||black === i*j){
    var timeFinish = Date.now() - timeStart;
    console.log(timeFinish);
    div.classList.remove("none");
    div.innerText = "Congrats you won for " + innerCounter + " moves"

  }
}

function changeColor(cellObject,arr){
  var up = getCoords(cellObject,"up",arr);
  var down = getCoords(cellObject,"down",arr);
  var left = getCoords(cellObject,"left",arr);
  var right = getCoords(cellObject,"right",arr);
  return arr.map(function(elements){
    return elements.map(function(item){
      if(item === up){
        item.color = getReverseColor(item.color);
      }
      if(item === down){
        item.color = getReverseColor(item.color);
      }
      if(item === left){
        item.color = getReverseColor(item.color);
      }
      if(item === right){
        item.color = getReverseColor(item.color);
      }
      if(item === cellObject){
        item.color = getReverseColor(item.color);
      }
      return item;
    })
  })

}

function Counter(c) {
  var counter = 0;
  return function() {
    counter++;
    return counter;
  }
}
var timeStart = 0;
var counter = Counter();
var arrMain = createInitialArr(3,3);
drawArr(arrMain);
