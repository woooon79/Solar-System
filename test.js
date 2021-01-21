

//import threejs file with url
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';          

              //Scene and Camera Configuration
              const scene = new THREE.Scene();
              const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000000 );


               // instantiate a listener
                const audioListener = new THREE.AudioListener();

                // add the listener to the camera
                camera.add( audioListener );

                // instantiate audio object
                const oceanAmbientSound = new THREE.Audio( audioListener );

                // add the audio object to the scene
                scene.add( oceanAmbientSound );

                // instantiate a loader
                const aloader = new THREE.AudioLoader();

                // load a resource
                aloader.load(
                    // resource URL
                    'sound/360Music.mp3',

                    // onLoad callback
                    function ( audioBuffer ) {
                        // set the audio object buffer to the loaded object
                        oceanAmbientSound.setBuffer( audioBuffer );

                        // play the audio
                        oceanAmbientSound.play();
                    },

                    // onProgress callback
                    function ( xhr ) {
                        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                    },

                    // onError callback
                    function ( err ) {
                        console.log( 'An error happened' );
                    }
                );


               //Renderer
                const renderer = new THREE.WebGLRenderer({ antialias: false,alpha:true });
                renderer.setSize( window.innerWidth, window.innerHeight );
                renderer.setClearColor(0x000000, 0);

                document.body.appendChild( renderer.domElement );

               
			   //Set background image
                const loader = new THREE.TextureLoader();
                const btexture = loader.load(
                    'background.jpeg',
                    () => {
                    const rt = new THREE.WebGLCubeRenderTarget(btexture.image.height);
                    rt.fromEquirectangularTexture(renderer, btexture);
                    
                    scene.background = rt;
                });


                 
                camera.position.set(66,10,44); // Set position like this


                
               //Orbit controls
                const controls = new OrbitControls(camera, renderer.domElement);
                controls.enableDamping = true;
                controls.saveState();
                
                var speed = {
                    movespeed : 1,
                    ringview :true
                };
	
                //Add gui controls (speed, orbit)
                const gui = new GUI();
                
                gui.add(speed, 'movespeed', 0, 5);
                gui.add(speed, 'ringview').onChange(function (value) {
                    
                }); 


            //lighting
            addDirectionalLight();
			createSpotlights(scene);
			
        
       

function addDirectionalLight() { //light source processing

    const light = new THREE.PointLight("white", 1.25); // All directions from 0,0,0
    light.position.set(0,0,0);
    scene.add( light );

    const light2 = new THREE.AmbientLight(0xaaaaaa); //all celestial brightness
    light2.position.set(0,0,0);
    light2.intensity = 0.5;
    scene.add( light2 );


}


//Detailed brightness control (light brightness on the other side of the sun)		
function createSpotlights(scene) {
  var color = 0xFFFFFF;
  var intensity = 5;
  var distance = 25;
  var angle = Math.PI/7;

  new Array(6).fill('').forEach((item, i) => {
    var spotlight = new THREE.SpotLight(color, intensity, distance, angle);
    var value = i % 2 === 0 ? 25 : -25;

    spotlight.position.set(
      i < 2 ? value : 0,
      i >= 2 && i < 4 ? value : 0,
      i >= 4 ? value : 0
    );
    scene.add( spotlight );
  });
}

//Camera control to point to each planet
//Rotate around a planet
const fitCameraToObject = function ( camera, object, offset, controls) {

    const boundingBox = new THREE.Box3();


    boundingBox.setFromObject( object );

    const center = boundingBox.getCenter();

    camera.updateProjectionMatrix();

    controls.target = center;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.enablePan = true;


    controls.maxDistance = offset;
    controls.minDistance = offset;

      
}
            





    


                
                //Planetary Orbital Landering
                const segments = 500;
                var material = new THREE.LineBasicMaterial({color: 0xFFFFFF});
                const mesh0 = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.RingBufferGeometry(25, 25, segments,0,0,Math.PI*2 )), material);
                const mesh1 = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.RingBufferGeometry(28, 28, segments,0,0,Math.PI*2 )), material);
                const mesh2 = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.RingBufferGeometry(31, 31, segments,0,0,Math.PI*2 )), material);
                const mesh3 = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.RingBufferGeometry(34, 34, segments,0,0,Math.PI*2 )), material);
                const mesh4 = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.RingBufferGeometry(42, 42, segments,0,0,Math.PI*2 )), material);
                const mesh5 = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.RingBufferGeometry(56, 56, segments,0,0,Math.PI*2 )), material);
                const mesh6 = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.RingBufferGeometry(50, 50, segments,0,0,Math.PI*2 )), material);
                const mesh7 = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.RingBufferGeometry(60, 60, segments,0,0,Math.PI*2 )), material);
                mesh0.rotation.x=1.57;
                mesh1.rotation.x=1.57;
                mesh2.rotation.x=1.57;
                mesh3.rotation.x=1.57;
                mesh4.rotation.x=1.57;
                mesh5.rotation.x=1.57;
                mesh6.rotation.x=1.57;
                mesh7.rotation.x=1.57;
                scene.add(mesh0);
                scene.add(mesh1);
                scene.add(mesh2);
                scene.add(mesh3);
                scene.add(mesh4);
                scene.add(mesh5);
                scene.add(mesh6);
                scene.add(mesh7);


                //solar system planetary rendering work
				//Texture mapping, resizing, and positioning
				
				//Sun
                var texture = new THREE.TextureLoader().load('texture/sunmap.jpg');
                var geometry = new THREE.SphereGeometry(1,32,16);
                var material = new THREE.MeshPhongMaterial({map:texture});
                var sun = new THREE.Mesh(geometry,material);
                scene.add(sun);
                sun.position.set(0, 0, 0);
				sun.scale.setScalar(10);

                //Mercury
                var texture = new THREE.TextureLoader().load('texture/mercurymap.jpg');
                var geometry = new THREE.SphereGeometry(1,32,16);
                var material = new THREE.MeshPhongMaterial({map:texture});
                var mercury = new THREE.Mesh(geometry,material);
				
				
				const mercuryGroup = new THREE.Group();
                mercury.position.set(25, 0, 0);
				mercury.scale.setScalar(0.8);
				mercuryGroup.add(mercury);
				scene.add(mercuryGroup);


                //Venus
                var texture = new THREE.TextureLoader().load('texture/venusmap.jpg');
                var geometry = new THREE.SphereGeometry(1,32,16);
                var material = new THREE.MeshPhongMaterial({map:texture});
                var venus = new THREE.Mesh(geometry,material);
				const venusGroup = new THREE.Group();
                venus.position.set(28, 0, 0);
				venus.scale.setScalar(0.9);
				venusGroup.add(venus);
				scene.add(venusGroup);
				

                //Earth
                var texture = new THREE.TextureLoader().load('texture/earthmap.jpg');
                var geometry = new THREE.SphereGeometry(1,32,16);
                var material = new THREE.MeshPhongMaterial({map:texture});
                var earth = new THREE.Mesh(geometry,material);
				const earthGroup = new THREE.Group();
                earth.position.set(31, 0, 0);
				earth.scale.setScalar(1);
                earthGroup.add(earth);
				scene.add(earthGroup);
                
				//Mars
                var texture = new THREE.TextureLoader().load('texture/marsmap.jpg');
                var geometry = new THREE.SphereGeometry(1,32,16);
                var material = new THREE.MeshPhongMaterial({map:texture});
                var mars = new THREE.Mesh(geometry,material);
				const marsGroup = new THREE.Group();
                mars.position.set(34, 0, 0);
				mars.scale.setScalar(0.8);
				marsGroup.add(mars);
				scene.add(marsGroup);
                
				
				//Jupiter
                var texture = new THREE.TextureLoader().load('texture/jupitermap.jpg');
                var geometry = new THREE.SphereGeometry(1,32,16);
                var material = new THREE.MeshPhongMaterial({map:texture});
                var jupiter = new THREE.Mesh(geometry,material);
				const jupiterGroup = new THREE.Group();
                jupiter.position.set(42, 0, 0);
				jupiter.scale.setScalar(3.5);
				jupiterGroup.add(jupiter);
				scene.add(jupiterGroup);				
				
				
                //Saturn
                var texture = new THREE.TextureLoader().load('texture/saturnmap.jpg');
                var geometry = new THREE.SphereGeometry(1,32,16);
                var material = new THREE.MeshPhongMaterial({map:texture});
                var saturn = new THREE.Mesh(geometry,material);
				const saturnGroup = new THREE.Group();
                saturn.position.set(50, 0, 0);
				saturn.scale.setScalar(2.9);
				saturnGroup.add(saturn);
				
				
				//Saturn wing
                let saturn_wings = [];
                
                var texture = new THREE.TextureLoader().load('texture/saturnringmap.jpg');

   
                var geometry = new THREE.RingBufferGeometry(3.5 , 5.5, 60);
                var pos = geometry.attributes.position;
                var v3 = new THREE.Vector3();
                for (let i = 0; i < pos.count; i++){
                    v3.fromBufferAttribute(pos, i);
                    geometry.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
                }

                var material = new THREE.MeshBasicMaterial({map:texture, side: THREE.DoubleSide});

                var wing = new THREE.Mesh(geometry,material);

                saturn_wings.push(wing);


                saturn_wings.forEach( w => {

                    w.rotation.x = 2;

                    w.rotation.y = 0.7;

                    scene.add(w);
                    w.position.set(50, 0, 0);


                });   

                saturnGroup.add(wing);
				scene.add(saturnGroup);


                //Uranus
                var texture = new THREE.TextureLoader().load('texture/uranusmap.jpg');
                var geometry = new THREE.SphereGeometry(1,32,16);
                var material = new THREE.MeshPhongMaterial({map:texture});
                var uranus = new THREE.Mesh(geometry,material);
                const uranusGroup = new THREE.Group();
                uranus.position.set(56, 0, 0);
				uranus.scale.setScalar(1.7);
				uranusGroup.add(uranus);

				
				
                //Uranus wing
                let uranus_wings = [];
                
                var texture = new THREE.TextureLoader().load('texture/uranusringmap.jpg');
                var geometry = new THREE.TorusGeometry(2.02,0.03, 2, 100);

                var material = new THREE.MeshBasicMaterial({map:texture, side: THREE.DoubleSide});


                var wing = new THREE.Mesh(geometry,material);

                uranus_wings.push(wing);



                uranus_wings.forEach( w => {

                    w.rotation.x = 0;

                    w.rotation.y = 0;

                    scene.add(w);
                    w.position.set(56, 0, 0);


                });
				
                uranusGroup.add(wing);
				scene.add(uranusGroup);

                //Neptune
                var texture = new THREE.TextureLoader().load('texture/neptunemap.jpg');
                var geometry = new THREE.SphereGeometry(1,32,16);
                var material = new THREE.MeshPhongMaterial({map:texture});
                var neptune = new THREE.Mesh(geometry,material);
                const neptuneGroup = new THREE.Group();
                neptune.position.set(60, 0, 0);
				neptune.scale.setScalar(1.65);
				neptuneGroup.add(neptune);
				scene.add(neptuneGroup);
                var now = 0;

                var id1,id2;
				 
				 
				 
		//implements rotation and revolution
		//Solar system model
         var animate = function (time) {

              id1=requestAnimationFrame( animate );

                //the planetary orbit
                mesh0.visible = speed.ringview;
                mesh1.visible = speed.ringview;
                mesh2.visible = speed.ringview;
                mesh3.visible = speed.ringview;
                mesh4.visible = speed.ringview;
                mesh5.visible = speed.ringview;
                mesh6.visible = speed.ringview;
                mesh7.visible = speed.ringview;
                 
                now = now + 5 * speed.movespeed;
                
				//sun rotation
                sun.rotation.y = now * 0.0019969;
				
				//mercury rotation
                mercury.rotation.y = now * 0.000003;
				//mercury revolution
	            mercuryGroup.rotation.y = now * 0.000478725;
				
                //venus rotation
                venus.rotation.y = now * 0.0000018;
				//venus revolution
 				venusGroup.rotation.y = now * 0.000350214;
				
                //earth rotation
                earth.rotation.y = now * 0.004651;
				//earth revolution
				earthGroup.rotation.y = now * 0.000297859;
								
                //mars rotation
                mars.rotation.y = now * 0.0002411;
				//mars revolution
                marsGroup.rotation.y = now * 0.000241309;
				
				//jupiter rotation   
                jupiter.rotation.y = now * 0.0126;
				//jupiter revolution
				jupiterGroup.rotation.y = now * 0.000130697;
				 
				 //saturn rotation
                saturn.rotation.y = now * 0.00987
				//saturn revolution
				saturnGroup.rotation.y = now * 0.000096724;
				 
				//uranus rotation
                uranus.rotation.y = now * 0.00259;
				//uranus revolution
				uranusGroup.rotation.y = now * 0.000068352;	
			    
				//neptune rotation
                neptune.rotation.y = now * 0.00268;
				//neptune revolution
                neptuneGroup.rotation.y = now * 0.000054778;

               

                    renderer.render( scene, camera );
                    controls.update();
                }

                animate();
				

			//button1(Planet info) event handler  
			const elem = document.querySelector('#play');
			elem.addEventListener('click', () => {cancelAnimationFrame(id1);now=0;render();});

            //button2(Solar system model) event handler
            const elem1 = document.querySelector('#universe');
			elem1.addEventListener('click', () => {	document.querySelector("#info").innerHTML = "";
					controls.autoRotate = false;cancelAnimationFrame(id2);now=0;    controls.maxDistance =10000;
    controls.minDistance = 0;camera.position.set(66,10,44);animate();});
	
	
	
  //regenerating planetary information
  
function render(time){


            id2= requestAnimationFrame( render );
			 

                
                mesh0.visible = speed.ringview;
                mesh1.visible = speed.ringview;
                mesh2.visible = speed.ringview;
                mesh3.visible = speed.ringview;
                mesh4.visible = speed.ringview;
                mesh5.visible = speed.ringview;
                mesh6.visible = speed.ringview;
                mesh7.visible = speed.ringview;
                 
                now = now + 5* speed.movespeed;

                sun.rotation.y = now * 0.0019969;
				
				
                mercury.rotation.y = now * 0.000003;
	            mercuryGroup.rotation.y = now * 0.000478725;
				

                venus.rotation.y = now * 0.0000018;
 				venusGroup.rotation.y = now * 0.000350214;
				

                earth.rotation.y = now * 0.004651;
				earthGroup.rotation.y = now * 0.000297859;
								

                mars.rotation.y = now * 0.0002411;
                marsGroup.rotation.y = now * 0.000241309;			
				   
                jupiter.rotation.y = now * 0.0126;
				jupiterGroup.rotation.y = now * 0.000130697;
				 
                saturn.rotation.y = now * 0.00987
				saturnGroup.rotation.y = now * 0.000096724;
				 
                uranus.rotation.y = now * 0.00259;
				uranusGroup.rotation.y = now * 0.000068352;	
					
                neptune.rotation.y = now * 0.00268;
                neptuneGroup.rotation.y = now * 0.000054778;

                
				//Each planet shows information continuously over time.
                //use HTML tag to show planet informations
				//call fitCameraToObject function to move camera
					
					   if (now <5000){
                    fitCameraToObject(camera,mercury,10,controls);
                    document.querySelector("#info").innerHTML = "<h1>Mercury</h1> <h3>88 EARTH DAYS / 0.39 AU</h3> <h4>The smallest in out solar system and closest to the Sun. Mercury is only slightly larger than Earth's Moon. Also it is the fastest planet, zipping around the Sun every 88 Earth days. ";
   
                }else if( 5000<= now && now <10000){
                fitCameraToObject(camera,venus,10,controls);
                document.querySelector("#info").innerHTML = "<h1>Venus</h1>  <h3>225 Earth DAYS / 0.7 AU</h3> <h4>Venus spins slowly in the opposite direction from most planets. A thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.</h4>";

                }else if( 10000<= now&& now<15000){
                    fitCameraToObject(camera,earth,10,controls);
                    document.querySelector("#info").innerHTML = "<h1>Earth</h1>  <h3>365.25 DAYS / 1 AU</h3><h4>Our home planet<br>Earth is only place we know of so far that's inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.";                    
				
                    }else if( 15000<= now && now<20000){
						 fitCameraToObject(camera,mars,10,controls);
                    document.querySelector("#info").innerHTML = "<h1>Mars</h1> <h4>1.88 EARTH YEARS / 1.5 AU </h3> <h4>Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was-billions of years ago- wetter and warmer, with a thicker atmosphere.";
    
					}else if( 20000<= now && now<25000){
							
                        fitCameraToObject(camera,jupiter,10,controls);
                        document.querySelector("#info").innerHTML = "<h1>Jupiter</h1><h3>11.86 EARTH YEARS / 5.2 AU</h3><h4>Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet's Great Red spot is a centuries -- old storm bigger than Earth.";
        
                        }
                            else if( 25000<= now && now<30000){
								fitCameraToObject(camera,saturn,10,controls);
                            document.querySelector("#info").innerHTML = "<h1>Saturn</h1> <h3>29.45 EARTH YEARS / 9.5 AU</h3><h4>Adorned with a dazzling complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's.";
            
                            }
                               else if( 30000<= now && now<35000){
                                     fitCameraToObject(camera,uranus,10,controls);
                                document.querySelector("#info").innerHTML = "<h1>Uranus</h1> <h3>84 EARTH YEARS / 19.8 AU</h3><h4>Uranus rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.";
                
                                }else if( 35000<= now&& now < 40000){
                                     fitCameraToObject(camera,neptune,10,controls);
                                    document.querySelector("#info").innerHTML = "<h1>Neptune</h1> <h3>164.81 EARTH YEARS / 30.1 AU</h3><h4>Neptune --the eight and most distant major planet orbiting our Sun-- is dar, cold and whipped by supersonic winds. It was the first planet located through mathematical calculations.";
                    
                                    }   
                                      
				else if(now>40000) {
				                  camera.position.set(66,10,44);
                                        document.querySelector("#info").innerHTML = "<h1>Sun</h1>  <h3>230MILLION EARTH YEARS<h4>The Sun is a yellow dwarf star, a hot ball of glowing gases at the heart of our solar system. Its gravity holds everything from the biggest planets to tiny debris in its orbit."
				}


               
             
               

                    renderer.render( scene, camera );
                    controls.update();
                };

