var textColor = '#fff';
var fontName = 'Roboto';

var URL = localStorage.getItem('url');
$('#mainbg').attr('src', URL);

var canvas = new fabric.Canvas('c');
canvas.backgroundColor = 'white';


//add the main image
var background = document.getElementById('mainbg');
var oheight = background.height;
var owidth = background.width;
var ratio = oheight / owidth;
var nheight = 400;
var nwidth = nheight / ratio;
var slide = (400 - nwidth) / 2;
console.log(slide);
console.log(ratio);
var bgInstance = new fabric.Image(background, {
    left: slide,
    top: 0,
    lockMovementX: true,
    lockMovementY: true,
    hoverCursor: 'arrow',
    selectable: false
});
bgInstance.set({
    scaleX: nwidth / owidth,
    scaleY: nheight / oheight
});
canvas.add(bgInstance);
window.onload = function () {
    if (!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}
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
        case 8:
            canvas.remove(canvas.getActiveObject());
            break;
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

document.getElementById('confirmbtn').addEventListener('click', function () {
    let el = document.getElementById('dlimg');
    el.href = document.getElementById('c').toDataURL(); // Change here
    chrome.runtime.sendMessage(el.href);
    el.download = 'design.png';
    localStorage.setItem("imgLink",el.href);
});
