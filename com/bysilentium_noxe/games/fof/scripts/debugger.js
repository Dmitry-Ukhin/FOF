var oDebugger = {
    prop: {
        bDebugMode: false,
        bShowCoordinates: true,
    },

    isActive: function () {
        return this.prop.bDebugMode;
    },

    print: function (text) {
        if (!this.isActive()) return;
        console.debug("D/ "+text);
    },

    openSettings: function () {
        var elementSettings = document.createElement("div");
        elementSettings.setAttribute("id", "dSettings");

        elementSettings.style.background = "white";
        elementSettings.style.position = "fixed";
        elementSettings.style.border = "1px solid black";
        elementSettings.style.minWidth = "300px";
        elementSettings.style.minHeight = "200px";
        elementSettings.style.top = "20%";
        elementSettings.style.left = "40%";
        elementSettings.style.zIndex = "100";
        elementSettings.style.textAlign = "center";

        elementSettings.innerHTML += "<h4>Debug settings</h4>";

        elementSettings.innerHTML +=
            "<input id='stateDebug' type='checkbox' "+(this.prop.bDebugMode ? "checked" : "")+">turn on debug</input><br>";

        elementSettings.innerHTML +=
                "<input id='showCoordinates' type='checkbox' "+
            (this.prop.bShowCoordinates ? "checked":"")+">show coordinates</input><br>";

        elementSettings.innerHTML += "<button onclick='oDebugger.acceptSettings()'>accept</button>";

        document.body.appendChild(elementSettings);
    },

    acceptSettings: function () {
        this.prop.bDebugMode = document.getElementById("stateDebug").checked;
        this.prop.bShowCoordinates = document.getElementById("showCoordinates").checked;
        document.getElementById("dSettings").remove();
        this.showCoordinates();
    },

    showCoordinates: function (x1, y1, x2, y2, x3, y3) {
        x1 = Math.floor(x1);
        x2 = Math.floor(x2);
        x3 = Math.floor(x3);
        y1 = Math.floor(y1);
        y2 = Math.floor(y2);
        y3 = Math.floor(y3);

        let elemCoords = document.getElementById("coords");
        if (this.prop.bShowCoordinates) {
            if (elemCoords) {
                let childNodes = elemCoords.childNodes;
                if (childNodes && childNodes.length > 0) {
                    childNodes[0].innerHTML = "mX: " + x1 + " mY: " + y1;
                    childNodes[1].innerHTML = "sX: " + x2 + " sY: " + y2;
                    childNodes[2].innerHTML = "cX: " + x3 + " cY: " + y3;
                }else{
                    oDebugger.print("div coordinates not found")
                }
            }else{
                oDebugger.print("New div coords");
                let divCords = document.createElement("div");
                divCords.setAttribute("id", "coords");
                divCords.style.position = "fixed";
                divCords.style.top = "0";
                divCords.style.left = "0";
                divCords.style.zIndex = "1000";
                divCords.innerHTML +=("<p>mX:"+x1+" mY:"+y1+"</p>");
                divCords.innerHTML +=("<p>sX:"+x2+" sY:"+y2+"</p>");
                divCords.innerHTML +=("<p>cX:"+x3+" cY:"+y3+"</p>");

                document.body.appendChild(divCords);
                // document.body.innerHTML += "<p id='cords' style='position: fixed; top: 0; left: 0;'>" +
                //     "X:"+x1+"::Y:"+y1+"</p>"
            }
        }else{
            if (elemCoords) {
                document.getElementById("coords").remove();
            }
        }
    }
};