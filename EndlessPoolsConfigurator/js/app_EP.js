var iframe = document.getElementById( 'api-frame' );
var version = '1.5.2';
var client = new Sketchfab(version,iframe);

//var uid = '6bcfb343d7a748dab554d9065c7e3084';
var uid = '1086a595cd794438945b2fbb6ed621f3';

var myMaterials;
var myNodes;

client.init( uid, {
    success: function onSuccess( api ){
        api.start();
        api.addEventListener( 'viewerready', function() {
            //API is ready to use
            console.log( 'Viewer is ready' );
        } );
        /*api.setBackground({color: [127,127,127,0]}, function(coord) {
            console.log("background changed");
        });*/
        api.getNodeMap(function(err, nodes) {
            if (!err) {
                console.log(nodes);
                myNodes = nodes;
            }
        });
        api.getMaterialList(function(err, materials) {
            if(!err) {
            console.log(materials);
            myMaterials = materials;
            }
        });
        //api.show(3);
    },
    error: function onError() {
        console.log( 'Viewer error' );
    },
    camera: 0,
    blending: 1,
    autospin: -.02,
    annotation_cycle: 4,
    transparent: 0
} );

function makeMyModelBlue(){
    for (var i=0; i<myMaterials.length; i++){
      var m = myMaterials[i];
      // here change only the channel you need to change
      m.channels.EmitColor.factor = 1; 
      m.channels.EmitColor.enable = true; 
      m.channels.EmitColor.color = [0.0,0.0,1.0];         
  }

};



var EP_width = 7;
var EP_length = 14;
var EP_depth = 42;

//Set width
//#region
/*
document.getElementById("7").addEventListener('click',function(){
    EP_width = 7;
    RedrawDisplay();
});
document.getElementById("8").addEventListener('click',function(){
    EP_width = 8;
    RedrawDisplay();
});
document.getElementById("9").addEventListener('click',function(){
    EP_width = 9;
    RedrawDisplay();
});
document.getElementById("10").addEventListener('click',function(){
    EP_width = 10;
    RedrawDisplay();
});
//#endregion
//Set Length
//#region
document.getElementById("12").addEventListener('click',function(){
    EP_length = 12;
    RedrawDisplay();
});
document.getElementById("13").addEventListener('click',function(){
    EP_length = 13;
    RedrawDisplay();
});
document.getElementById("14").addEventListener('click',function(){
    EP_length = 14;
    RedrawDisplay();
});
document.getElementById("15").addEventListener('click',function(){
    EP_length = 15;
    RedrawDisplay();
});
document.getElementById("16").addEventListener('click',function(){
    EP_length = 16;
    RedrawDisplay();
});
//#endregion
//Set Depth
//#region
document.getElementById("42").addEventListener('click',function(){
    EP_depth = 42;
    RedrawDisplay();
});
document.getElementById("48").addEventListener('click',function(){
    EP_depth = 48;
    RedrawDisplay();
});
document.getElementById("54").addEventListener('click',function(){
    EP_depth = 54;
    RedrawDisplay();
});
//#endregion



var widthDisplay = document.getElementById("n_width");
var lengthDisplay = document.getElementById("n_length");
var depthDisplay = document.getElementById("n_depth");

function RedrawDisplay(){
    widthDisplay.innerHTML = EP_width+"'";
    lengthDisplay.innerHTML = EP_length+"'";
    depthDisplay.innerHTML = EP_depth+'"';
};
*/
//var acrylicLabel = document.getElementById("t_acrylicLabel");

function changeAcrylic(obj)
{
    l_acrylic.innerHTML = obj.value;
};
/*function SetModel(){
    makeMyModelBlue();
}

var myNodelist = document.querySelectorAll("button");
for (i = 0; i < myNodelist.length; i++) { 
    myNodelist[i].addEventListener('click',SetModel());
};*/

//Accordian

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}



//GUI
function initGUI(){
    //Dimension UI
    //#region
    /*
    var t_config = document.getElementById("t_config");
    t_config.innerHTML = "ORIGINAL EP CONFIGURATION";
    t_config.style.top = "18px";
    t_config.style.left = "150px";
    t_config.style.fontSize = "22px";
    t_config.style.fontWeight = "100";

    var t_select = document.getElementById("t_select");
    t_select.innerHTML = "DIMENSIONS";
    t_select.style.fontWeight ="600";
    t_select.style.top = "70px";
    t_select.style.left = "10px";

    var t_width = document.getElementById("t_width");
    t_width.innerHTML = "Width:";
    t_width.style.textAlign = "right";
    t_width.style.top = "100px";
    t_width.style.left = "0px";
    t_width.style.width = "50px";
    var t_length = document.getElementById("t_length");
    t_length.innerHTML = "Length:";
    t_length.style.textAlign = "right";
    t_length.style.top = "100px";
    t_length.style.left = "0px";
    t_length.style.width = "150px";
    var t_depth = document.getElementById("t_depth");
    t_depth.innerHTML = "Depth:";
    t_depth.style.textAlign = "right";
    t_depth.style.top = "100px";
    t_depth.style.left = "0px";
    t_depth.style.width = "245px";

    var widthButton = document.getElementById("width");
    widthButton.style.top = "95px";
    widthButton.style.left = "55px";
    var lengthButton = document.getElementById("length");
    lengthButton.style.top = "95px";
    lengthButton.style.left = "155px";
    var depthButton = document.getElementById("depth");
    depthButton.style.top = "95px";
    depthButton.style.left = "250px";
    //#endregion

    //Acrylic
    var t_acrlyic = document.getElementById("t_acrylic");
    t_acrylic.innerHTML = "CURRENT SYSTEM COLOR:";
    t_acrylic.style.fontWeight ="600";
    t_acrylic.style.top = "140px";
    t_acrylic.style.left = "10px";

    var l_acrlyic = document.getElementById("l_acrylic");
    l_acrylic.innerHTML = "Platinum";
    l_acrylic.style.fontWeight ="600";
    l_acrylic.style.top = "140px";
    l_acrylic.style.left = "200px";

    var r_platinum = document.getElementById("r_platinum");
    r_platinum.style.top = "165px";
    r_platinum.style.left = "30px";
    r_platinum.style.backgroundColor = '#999999';

    var r_sapphire = document.getElementById("r_sapphire");
    r_sapphire.style.top = "165px";
    r_sapphire.style.left = "65px";
    r_sapphire.style.backgroundColor = '#000066';
    */

}
initGUI();

//var uid = '731235038f6945d19f10d9331b78ea09';
//var client = null;
/*
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
          } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
          } else if (iframe.mozRequestFullScreen) {
            iframe.mozRequestFullScreen();
          } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
          }

        function loadmodel(){
            document.addEventListener('load', () => console.log( 'viewerready' ))

            // By default, the latest version of the viewer API will be used.
            var client = new Sketchfab( iframe );

            // Alternatively, you can request a specific version.
            // var client = new Sketchfab( '1.0.0', iframe );

            client.init( uid, {
                success: function onSuccess( api ){
                    console.log( 'Success' );
                    api.load();
                    api.start();

                    api.addEventListener( 'viewerready', function() {
                        console.log( 'Viewer is ready' );
                        // once the viewer is ready, show the iframe
                        let $apiFrame = document.getiframeentById( 'api-frame' );
                        $apiFrame.classList.remove( 'hidden' ); // Remove hidden class
                    } );
                },
                error: function onError( callback ){
                    console.log( this.error );
                }
            } );
        };
        */