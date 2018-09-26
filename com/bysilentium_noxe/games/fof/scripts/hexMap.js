var oMap = {
    hexagonAngle: 0.523598776,// 30 degrees in radians

    /*
    45{X:77; Y:67}
    40{X:69; Y:60}
    35{X:60; Y:52}
    30{X:51; Y:45}
    1: stepX=8; stepY=7
    2: stepX=9; stepY=83000
    3: stepX=9(8); stepY=7
    */
    sideLength: 35,
    stepX: 60,
    stepY: 52,

};

oMap.hexHeight = Math.sin(oMap.hexagonAngle) * oMap.sideLength;//=18.00000001252380
oMap.hexRadius = Math.cos(oMap.hexagonAngle) * oMap.sideLength;//=31.17691452900917
oMap.hexRectangleHeight = oMap.sideLength + 2 * oMap.hexHeight;//=72.00000002504760
oMap.hexRectangleWidth = 2 * oMap.hexRadius;                   //=62.35382905801834

oMap.stateClick = {
    curDown: false,
    curYPos: -1,
    curXPos: -1
};

oMap.drawHexagon = function(canvasContext, x, y, fill){

    fill = fill || false;
    canvasContext.beginPath();
    canvasContext.moveTo(x + this.hexRadius, y);
    canvasContext.lineTo(x + this.hexRectangleWidth, y + this.hexHeight);
    canvasContext.lineTo(x + this.hexRectangleWidth, y + this.hexHeight + this.sideLength);
    canvasContext.lineTo(x + this.hexRadius, y + this.hexRectangleHeight);
    canvasContext.lineTo(x, y + this.sideLength + this.hexHeight);
    canvasContext.lineTo(x, y + this.hexHeight);

    canvasContext.closePath();
    if(fill) {
        canvasContext.fill();
    } else {
        canvasContext.stroke();
    }

};

oMap.mouseMove = function (event) {
    if(oMap.stateClick.curDown === true){
        let scrollToLeft = document.documentElement.scrollLeft + (oMap.stateClick.curXPos - event.pageX);
        let scrollToTop = document.documentElement.scrollTop + (oMap.stateClick.curYPos - event.pageY);
        // console.debug("scrollToLeft: "+scrollToLeft+"; scrollToTop: "+scrollToTop);
        window.scroll(scrollToLeft, scrollToTop);

    }

    let hexY = Math.floor(event.pageY / (oMap.hexHeight + oMap.sideLength));
    let hexX = Math.floor((event.pageX - (hexY % 2) * oMap.hexRadius) / oMap.hexRectangleWidth);
    screenX = hexX * oMap.hexRectangleWidth + ((hexY % 2) * oMap.hexRadius);
    screenY = hexY * (oMap.hexHeight + oMap.sideLength);
    let coordX = Math.floor(screenX / oMap.stepX);
    let coordY = Math.floor(screenY / oMap.stepY);

    oDebugger.showCoordinates(event.pageX, event.pageY, screenX, screenY, coordX, coordY);
};

oMap.mouseDown = function (event) {
    oDebugger.print("mouse-down");

    oMap.stateClick.curDown = true;
    oMap.stateClick.curYPos = event.pageY;
    oMap.stateClick.curXPos = event.pageX;

    // oDebugger.print("curXPos: "+oMap.stateClick.curXPos+"; curYPos: "+oMap.stateClick.curYPos)
};

oMap.mouseUp = function (event) {
    oDebugger.print("mouse-up");
    oMap.stateClick.curDown = false;
};

oMap.mouseDoubleClick = function (event) {
    // var canvas = document.getElementById("grid");
    // var ctx = canvas.getContext('2d');
    // ctx.fillStyle = "#d3d3d3";

    var hexY = Math.floor(oMap.stateClick.curYPos / (oMap.hexHeight + oMap.sideLength));
    var hexX = Math.floor((oMap.stateClick.curXPos - (hexY % 2) * oMap.hexRadius) / oMap.hexRectangleWidth);

    screenX = hexX * oMap.hexRectangleWidth + ((hexY % 2) * oMap.hexRadius);
    screenY = hexY * (oMap.hexHeight + oMap.sideLength);
    let coordX = Math.floor(screenX / oMap.stepX);
    let coordY = Math.floor(screenY / oMap.stepY);

    // if ((coordX < 0 || coordY < 0) ||
    //     (coordX > multiplierMapSize-2 || coordY > multiplierMapSize-1)){
    //     oDebugger.print("coords out the border (" + coordX + ":"+coordY+")");
    //     return ;
    // }

    let hexagonContainer = document.createElement("div");
    hexagonContainer.setAttribute("class", "hex-contain");
    let hexagon = document.createElement("div");
    hexagon.setAttribute("class", "hexagon");
    hexagonContainer.style.position = "absolute";
    hexagonContainer.style.left = screenX;
    hexagonContainer.style.top = screenY;
    hexagonContainer.appendChild(hexagon);

    document.body.appendChild(hexagonContainer);

    // oMap.drawHexagon(ctx, screenX, screenY, true);

    // ctx.font = "12px Arial";
    // ctx.fillStyle = "#ff1000";

    // var coordX, coordY;

    // ctx.fillText(Math.floor(screenX)+"X:"+Math.floor(screenY)+"Y", screenX+7, screenY+40);
    oDebugger.print("screenX: "+Math.floor(screenX)+" screenY: "+Math.floor(screenY));
    oDebugger.print("coords: "+coordX+":"+coordY);
    // ctx.fillText("["+coordX+":"+coordY+"]", screenX+25, screenY+55);
};

