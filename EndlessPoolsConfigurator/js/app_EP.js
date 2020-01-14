var iframe = document.getElementById( 'api-frame' );
var version = '1.5.2';
var client = new Sketchfab(version,iframe);

var uid = '6bcfb343d7a748dab554d9065c7e3084';
//var uid = '1086a595cd794438945b2fbb6ed621f3';

var myMaterials;
var myNodes;
var myScenes;

var animationClips = {}; 

var oep = { width: 7, length: 14 };

client.init( uid, {
    success: function onSuccess( api ){
        api.start();
        api.addEventListener( 'viewerready', function() {
            //API is ready to use
            console.log( 'Viewer is ready' );
            getNodeMap(api);
            getSceneGraph(api);
            getMaterialList(api);

            //Get animations

            api.getAnimations(function(err, animations) {
                console.log(animations);
                var firstAnimationUID = animations[1][0];
                api.setCurrentAnimationByUID(firstAnimationUID);
                
                
            });

            api.play(function(err){
                api.pause();                 
            }); 
            client.onload = function() {changeAnimation(api)};
            document.getElementById("selectWidth").onchange = function() {changeAnimation(api)};
            document.getElementById("selectLength").onchange = function() {changeAnimation(api)};
            //var firstAnimationUID = animations[0][0];
            //api.setCurrentAnimationByUID(firstAnimationUID);
            //#region
/*
            api.getAnimations(generateAnimationControls);

            function generateAnimationControls  (err, animations) {
                if (err) {
                    console.log('Error when calling getAnimations');
                    return;
                };
               //console.log(animations);
                for (var i = 0; i < animations.length; i++) {
        
                    var ob = animationClips[animations[i][1]] = {};
                    ob.name = animations[i][1]
                    ob.uid = animations[i][0];
                    ob.length = animations[i][2];
                   
                };       
               
            }
        
        function getAnimationObject  (key) {
                var dataObjectRef = animationClips[key];
                if (dataObjectRef == null) {
                    console.error('a call to  getAnimationObject using key/name ' + key + ' has failed , no such object found');
                    return null;
                }
                return dataObjectRef;
            }
        
        function PlayAnimationClip  (key) {
            
               var dataObjectRef = getAnimationObject(key);
               
               if (dataObjectRef != null) {          
                   api.setCurrentAnimationByUID(dataObjectRef.uid,OnSetAnimationClip);
               }
              
              
           }
        
        function OnSetAnimationClip  (err) {
             
               api.play();
           
               
           }
*/
           //#endregion

            var nodeMap = {"b7":3,"b8":162,"b9":114,"b10":66,
                           "t7":198,"t8":150,"t9":102,"t10":54,
                           "r12":186,"r13":138,"r14":90,"r15":42,"r16":18,
                           "l12":174,"l13":126,"l14":78,"l15":30,"l16":3};
            var currentWalls = (({ b7,t7,l14,r14 }) => ({  b7,t7,l14,r14 }))(nodeMap);

            //changeWidth(api,nodeMap);
            //changeLength(api,nodeMap);

            //document.getElementById("selectWidth").onchange = function() {changeWidth(api,nodeMap)};
            //document.getElementById("selectLength").onchange = function() {changeLength(api,nodeMap)};
        } );
        /*api.setBackground({color: [127,127,127,0]}, function(coord) {
            console.log("background changed");
        });*/
    },
    error: function onError() {
        console.log( 'Viewer error' );
    },
    camera: 0,
    blending: 1,
    autospin: -.02,
    ui_animations: 0,
    annotation_cycle: 4,
    transparent: 0
} );

//***      Animations       ***/

/*for anything using UID’s , animations or node objects you should always 
get them fresh per session because they are not guaranteed to be the same across sessions. 
In my utility I like to abstract the concept of needing to use UID’s and rather want to use 
names of objects and animations. so for example create an object to store animations by name 
and the create a play function that accepts a name and then does the lookup for the UID :*/

function changeAnimation(api){
    var x = EP_width.options[EP_width.selectedIndex].value;
    var y = EP_length.options[EP_length.selectedIndex].value;

    var z = (x-7)*5+(y-12);

    console.log(x,y,z);
    api.seekTo(z,function(err){               
    }); 
}



function changeWidth(api,nodeMap){

    var rLengths = (({ r12,r13,r14,r15,r16 }) => ({  r12,r13,r14,r15,r16 }))(nodeMap);
    var lLengths = (({ l12,l13,l14,l15,l16 }) => ({  l12,l13,l14,l15,l16 }))(nodeMap);

    //106
    //121.25
    //136.5
    //151.75
    
    var x = EP_width.options[EP_width.selectedIndex].value;
    switch (+x){
        case 7:
            var not7 = (({ b8,t8,b9,t9,b10,t10 }) => ({  b8,t8,b9,t9,b10,t10 }))(nodeMap);
            hide(api,not7);
            var is7 = (({ b7,t7 }) => ({  b7,t7 }))(nodeMap);
            show(api,is7);
            translate(api,rLengths,[106,0,0]);
            translate(api,lLengths,[-106,0,0]);
        break;
        case 8:
            var not8 = (({ b7,t7,b9,t9,b10,t10 }) => ({  b7,t7,b9,t9,b10,t10 }))(nodeMap);
            hide(api,not8);
            var is8 = (({ b8,t8 }) => ({  b8,t8 }))(nodeMap);
            show(api,is8);
            translate(api,rLengths,[121.25,0,0]);
            translate(api,lLengths,[-121.25,0,0]);
        break;
        case 9:
            var not9 = (({ b8,t8,b7,t7,b10,t10 }) => ({  b8,t8,b7,t7,b10,t10 }))(nodeMap);
            hide(api,not9);
            var is9 = (({ b9,t9 }) => ({  b9,t9 }))(nodeMap);
            show(api,is9);
            translate(api,rLengths,[136.5,0,0]);
            translate(api,lLengths,[-136.5,0,0]);
        break;
        case 10:
            var not10 = (({ b8,t8,b9,t9,b7,t7 }) => ({  b8,t8,b9,t9,b7,t7 }))(nodeMap);
            hide(api,not10);
            var is10 = (({ b10,t10 }) => ({  b10,t10 }))(nodeMap);
            show(api,is10);
            translate(api,rLengths,[151.75,0,0]);
            translate(api,lLengths,[-151.75,0,0]);
        break;
    }
}

function changeLength(api,nodeMap){
    //hide all lengths
    var allLengths = (({ r12,r13,r14,r15,r16,l12,l13,l14,l15,l16 }) => ({  r12,r13,r14,r15,r16,l12,l13,l14,l15,l16 }))(nodeMap);       
    hide(api,allLengths);

    var bWidths = (({ b7,b8,b9,b10 }) => ({  b7,b8,b9,b10 }))(nodeMap);
    var tWidths = (({ t7,t8,t9,t10 }) => ({  t7,t8,t9,t10 }))(nodeMap);

    //181.6
    //196.85
    //212.1
    //227.35
    //242.6

    var x = EP_length.options[EP_length.selectedIndex].value;
    switch (+x){
        case 12:
            var is12 = (({ r12,l12 }) => ({  r12,l12}))(nodeMap);
            show(api,is12);
            translate(api,bWidths,[0, 0, 181.6]);
            translate(api,tWidths,[0, 0, -181.6]);
        break;
        case 13:
            var is12 = (({ r13,l13 }) => ({  r13,l13}))(nodeMap);
            show(api,is12);
            translate(api,bWidths,[0, 0, 196.85]);
            translate(api,tWidths,[0, 0, -196.85]);
        break;
        case 14:
            var is12 = (({ r14,l14 }) => ({  r14,l14}))(nodeMap);
            show(api,is12);
            translate(api,bWidths,[0, 0, 212.1]);
            translate(api,tWidths,[0, 0, -212.1]);
        break;
        case 15:
            var is12 = (({ r15,l15 }) => ({  r15,l15}))(nodeMap);
            show(api,is12);
            translate(api,bWidths,[0, 0, 227.35]);
            translate(api,tWidths,[0, 0, -227.35]);
        break;
        case 16:
            var is12 = (({ r16,l16 }) => ({  r16,l16}))(nodeMap);
            show(api,is12);
            translate(api,bWidths,[0, 0, 242.6]);
            translate(api,tWidths,[0, 0, -242.6]);
        break;
    }
}

function getNodeMap(api){
    api.getNodeMap(function(err, nodes) {
        if (!err) {
            //console.log(nodes);

            //var nodeMap = {};
            let nodeMap = {};
            for ( const prop in nodes ) {
                if ( nodes.hasOwnProperty( prop ) ) {
                    nodeMap[nodes[prop].name] = nodes[prop].instanceID;              
                }
            }
            console.log(Object.keys(nodeMap).length);

            for (var prop in nodeMap){
                if(nodeMap.hasOwnProperty( prop )){
                   // console.log(nodeMap['b7']);
                }
            }
        }
    });
}

function getSceneGraph(api){
    api.getSceneGraph(function(err, scenes) {
        if(!err) {
        console.log(scenes);
        myScenes = scenes;
        }
    });
}

function getMaterialList(api){
    api.getMaterialList(function(err, materials) {
        if(!err) {
        console.log(materials);
        myMaterials = materials;
        }
    });
}

function translate(api,ids,newPos){
    //returns array of property names
    Object.keys(ids).forEach((key,index) => {
        api.translate(ids[key],newPos);
    })

}

function hide(api,ids){
    //returns array of property names
    Object.keys(ids).forEach((key,index) => {
        api.hide(ids[key]);
    })
    
}

function show(api,ids){
    //returns array of property names
    Object.keys(ids).forEach((key,index) => {
        api.show(ids[key]);
    })
    
}

function makeMyModelBlue(){
    for (var i=0; i<myMaterials.length; i++){
      var m = myMaterials[i];
      // here change only the channel you need to change
      m.channels.EmitColor.factor = 1; 
      m.channels.EmitColor.enable = true; 
      m.channels.EmitColor.color = [0.0,0.0,1.0];         
  }

};



var EP_width = document.getElementById("selectWidth");
var EP_length = document.getElementById("selectLength");
var EP_depth = document.getElementById("selectDepth");


console.log("Hello World!");

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