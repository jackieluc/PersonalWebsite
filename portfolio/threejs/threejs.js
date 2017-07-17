var container;

var camera, controls, scene, renderer;

var textGeometry, nameGeometry, earthMesh, cloudMesh, starMesh;
var group;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var radius = 80;
var segments = 20;

var loader = new THREE.FontLoader();
loader.load( 'assets/fonts/droid_sans_regular.typeface.json', function ( font ) {
    init( font );
    animate();
} );

function init( font ) {

    //create an element to display onto the screen
    container = document.getElementById('threejs');
//    document.body.appendChild( container );

    //create the camera and set the camera position
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 100, 500 );

    scene = new THREE.Scene();

    //the texts that will be displayed on screen
    var text = "Website Under Construction";
    var name = "{ Jackie Luc }";

    //create geometry for the two texts
    textGeometry = new THREE.TextGeometry( text, {
        font: font,
        size: 24,
        height: 15,
        curveSegments: 2
    } );

    nameGeometry = new THREE.TextGeometry( name, {
        font: font,
        size: 20,
        height: 10,
        curveSegments: 2
    } );

    //calculate middle offset for texts
    textGeometry.computeBoundingBox();
    var textOffset = -0.5 * ( textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x );

    nameGeometry.computeBoundingBox();
    var nameOffset = -0.5 * ( nameGeometry.boundingBox.max.x - nameGeometry.boundingBox.min.x );

    //color the texts
    var textMaterial = new THREE.MultiMaterial( [
        new THREE.MeshBasicMaterial( { color: 0xff6666, overdraw: 0.5 } ),
        new THREE.MeshBasicMaterial( { color: 0xfcb0b3, overdraw: 0.5 } )
    ] );

    var nameMaterial = new THREE.MultiMaterial( [
        new THREE.MeshBasicMaterial( { color: 0x6699cc, overdraw: 0.5 } ),
        new THREE.MeshBasicMaterial( { color: 0xb2cce5, overdraw: 0.5 } )
    ] );

    //create meshes for the texts
    var textMesh = new THREE.Mesh( textGeometry, textMaterial );
    var nameMesh = new THREE.Mesh( nameGeometry, nameMaterial );

    //create earth mesh with texture, bump, and specular mapping
    earthMesh = new THREE.Mesh(
    	new THREE.SphereGeometry( radius, segments, segments ),
    	new THREE.MeshPhongMaterial( {
            map: THREE.ImageUtils.loadTexture( 'assets/images/2_no_clouds_4k.jpg' ),
            bumpMap: THREE.ImageUtils.loadTexture( 'assets/images/elev_bump_4k.jpg' ),
    		bumpScale: 0.5,
    		specularMap: THREE.ImageUtils.loadTexture( 'assets/images/water_4k.png' ),
    		specular: new THREE.Color( 'grey' ),
            overdraw: true
        } )
    );

    //create cloud mesh that is transparent and a little bigger than earth to simulate 3D space
    cloudMesh = new THREE.Mesh(
        new THREE.SphereGeometry( radius + 0.5, segments, segments ),
    	new THREE.MeshPhongMaterial( {
            map: THREE.ImageUtils.loadTexture( 'assets/images/fair_clouds_4k.png' ),
            opacity: 0.8,
            transparent: true,
            depthWrite: false,
        } )
    );

    //create cloud mesh that is big enough to encompass entire screen to simulate perspective 3D space
    starMesh = new THREE.Mesh(
        new THREE.SphereGeometry( radius + 370, segments / 2, segments / 2 ),
    	new THREE.MeshBasicMaterial( {
            map: THREE.ImageUtils.loadTexture( 'assets/images/galaxy_starfield.png' ),
            side: THREE.BackSide
        } )
    );

    //position under construction text
    textMesh.position.x = textOffset;
    textMesh.position.y = 175;
    textMesh.position.z = 80;

    // textMesh.rotation.x = 0;
    // textMesh.rotation.y = Math.PI * 2;

    //position name text
    nameMesh.position.x = nameOffset;
    nameMesh.position.y = 10;
    nameMesh.position.z = 0;

    //position and tilt earth and clouds
    earthMesh.position.y = 175;
    earthMesh.rotation = 6;
    cloudMesh.position.y = 175;
    cloudMesh.rotation = 6;

    //position star mesh
    starMesh.position.y = 175;

    group = new THREE.Group();
    group.add( textMesh );
    //group.add( nameMesh );

    // add objects to the scene
    scene.add( group );
    scene.add( nameMesh );
    scene.add( earthMesh );
    scene.add( cloudMesh );
    scene.add( starMesh );

    // add ambient light
    scene.add( new THREE.AmbientLight( 0x333333 ) );

    // add directional light
    var light = new THREE.DirectionalLight( 0xffffff, 0.8 );
    light.position.set(100, 100, 50 );
    scene.add( light );

    //render the scene and add the scene to display to the user
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( 0x000000 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.noPan = true;
    //listener to adjust when window is resized
    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    earthMesh.rotation.y += 0.005;
    cloudMesh.rotation.y += 0.005;
    group.rotation.y -= 0.008;
    controls.update();
    renderer.render( scene, camera );
}