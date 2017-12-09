var textColor = '#fff';
var fontName = 'Roboto';

var canvas = new fabric.Canvas('c');
canvas.backgroundColor = 'white';


//add the subordinate images

function readFile() {

    if (this.files && this.files[0]) {

        var FR = new FileReader();

        FR.addEventListener("load", function (e) {
            document.getElementById("preview").src = e.target.result;

            fabric.Image.fromURL(e.target.result, function (myImg) {
                //i create an extra var for to change some image properties
                var img1 = myImg.set({
                    left: 0,
                    top: 0,
                });
                canvas.add(img1);
            });

        });
        FR.readAsDataURL(this.files[0]);
    }
}

document.getElementById("upimage").addEventListener("change", readFile);


//add text
var setColor = function (x) {
    console.log('setColor called');
    textColor = '#' + x;
    console.log('Color set to ' + textColor);
};

var colors = document.getElementsByClassName('selector');

for (i = 0; i < colors.length; i++) {
    let temp = '#' + colors[i].id;
    colors[i].addEventListener('click', function () {
        console.log('New color chosen');
        textColor = temp;
    })
}
var addText = function () {

    let textValue = document.getElementById('textvalue').value;
    if (textValue === "") {
        alert('Enter a text first');
        return;
    }
    let font = document.getElementById("fonts");
    let value = font.options[font.selectedIndex].value;
    fontName = font.options[font.selectedIndex].text;

    var mytext = new fabric.Text(textValue, {
        left: 200,
        top: 200,
        fontFamily: fontName,
        fill: textColor
    });

    canvas.add(mytext);
    document.getElementById('textvalue').value = " ";

}

document.getElementById('setText').addEventListener('click', addText);


//deleting object
document.getElementById('deleteobj').addEventListener('click', function () {
    canvas.remove(canvas.getActiveObject());
});


document.addEventListener("keydown", KeyCheck);

function KeyCheck(event) {
    var KeyID = event.keyCode;
    switch (KeyID) {
        case 46:
            canvas.remove(canvas.getActiveObject());
            break;
        default:
            break;
    }
}

//slider controls

var hueslider = document.getElementById("hue");

var showvalue = function () {
    "use strict";
    var hue;
    var temp = this.value;
    var namevalue = this.name;
    if (namevalue === "hue") {
        temp = temp + "deg";
    }
    namevalue = "--" + namevalue;
    document.documentElement.style.setProperty(namevalue, temp);
};

hueslider.addEventListener("change", showvalue);
hueslider.addEventListener("mousemove", showvalue);


//trophy name update

fabric.loadSVGFromURL("plate.svg", function (objects, options) {

    var loadedObjects1 = fabric.util.groupSVGElements(objects, options);

    loadedObjects1.set({
        top: 320,
        left: 80,
        scaleX: 0.8,
        scaleY: 0.8,
        lockMovementX: true,
        lockMovementY: true,
        hoverCursor: 'arrow',
        selectable: false
    });

    canvas.add(loadedObjects1);
    canvas.renderAll();
    canvas.sendToBack(loadedObjects1);
});

var loadedObjects2;
fabric.loadSVGFromURL("base.svg", function (objects, options) {

    loadedObjects2 = fabric.util.groupSVGElements(objects, options);
    loadedObjects2.set({
        top: 262,
        left: 80,
        scaleX: 0.8,
        scaleY: 0.8,
        lockMovementX: true,
        lockMovementY: true,
        hoverCursor: 'arrow',
        selectable: false
    });

    canvas.add(loadedObjects2);
    canvas.renderAll();
    canvas.sendToBack(loadedObjects2);
});

var trophyCaption = new fabric.IText('Enter the caption', {
    top: 340,
    left: 140,
    fill: 'white',
    fontSize: 16,
    fontFamily: 'Roboto'
});

canvas.add(trophyCaption);

canvas.bringToFront(trophyCaption);

var changeColor = function (x) {
    fabric.loadSVGFromURL("base.svg", function (objects, options) {
        loadedObjects2.set({
            fill: '#' + x,
        });
        canvas.renderAll();

    });
}

var addArchery = function () {
    fabric.Image.fromURL('trophies/archery.png', function (myImg) {
        //i create an extra var for to change some image properties
        var archery = myImg.set({
            left: 130,
            top: 30,
            scaleX: 0.9,
            scaleY: 0.9
        });
        canvas.bringToFront(archery);
        canvas.add(archery);
        canvas.renderAll();
    });
};


var addFigureine = function () {
    fabric.Image.fromURL('trophies/figurine.png', function (myImg) {
        //i create an extra var for to change some image properties
        var figureine = myImg.set({
            left: 120,
            top: 45,
            scaleX: 0.7,
            scaleY: 0.7
        });
        canvas.bringToFront(figureine);
        canvas.add(figureine);
        canvas.renderAll();
    });
};


var addBoat = function () {
    fabric.Image.fromURL('trophies/boat.png', function (myImg) {
        //i create an extra var for to change some image properties
        var boat = myImg.set({
            left: 120,
            top: 200
        });
        canvas.bringToFront(boat);
        canvas.add(boat);
        canvas.renderAll();
    });
};


var addCar = function () {
    fabric.Image.fromURL('trophies/car.png', function (myImg) {
        //i create an extra var for to change some image properties
        var car = myImg.set({
            left: 125,
            top: 55
        });
        canvas.bringToFront(car);
        canvas.add(car);
        canvas.renderAll();
    });
};

var addMagic = function () {
    fabric.Image.fromURL('trophies/magic.png', function (myImg) {
        //i create an extra var for to change some image properties
        var magic = myImg.set({
            left: 140,
            top: 70
        });
        canvas.bringToFront(magic);
        canvas.add(magic);
        canvas.renderAll();
    });
};

var addVolleyball = function () {
    fabric.Image.fromURL('trophies/volleyball.png', function (myImg) {
        //i create an extra var for to change some image properties
        var volleyball = myImg.set({
            left: 150,
            top: 70
        });
        canvas.bringToFront(volleyball);
        canvas.add(volleyball);
        canvas.renderAll();
    });
};

document.getElementById('trophyType').addEventListener('change', function () {
    let ela = this.value;

    switch (ela) {
        case 'archery':
            addArchery();
            break;
        case 'figurine':
            addFigureine();
            break;
        case 'car':
            addCar();
            break;
        case 'boat':
            addBoat();
            break;
        case 'magic':
            addMagic();
            break;
        case 'volleyball':
            addVolleyball();
            break;
    }
});
