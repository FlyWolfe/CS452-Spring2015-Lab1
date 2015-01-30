
var gl;
var points;

var object = 0;
var size = 3;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
    // Four Vertices
    

  canvas.addEventListener("mousedown", function(event){
	if (object == 0) {
		var vertices = [
			vec2( -0.5, -0.5 ),
			vec2(  -0.5,  0.5 ),
			vec2(  0.5, 0.5 )
		];
		size = 3;
		object = 1;
	}
	else if (object == 1) {
		var vertices = [
			vec2( -0.5, -0.5 ),
			vec2(  -0.5,  0.5 ),
			vec2(  0.5, 0.5 ),
			vec2( 0.5, -0.5)
		];
		size = 4;
		object = 2;
	}
	else if (object == 2) {
		var vertices = [
			vec2( -0.3, -0.3 ),
			vec2(  -0.3,  0.3 ),
			vec2(  0.4, 0.4 ),
			vec2( 0.4, -0.4),
			vec2( 0.6, 0),
			vec2( 0.4, 0.4)
		];
		size = 6;
		object = 0;
	}
	  
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
  });
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, size );
}
