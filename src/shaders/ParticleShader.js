const ParticleShader = {
	vertexShader: `
    #define USE_SIZEATTENUATION
    uniform float size;
    uniform float scale;
    #include <common>
    #include <color_pars_vertex>
    #include <fog_pars_vertex>
    #include <morphtarget_pars_vertex>
    #include <logdepthbuf_pars_vertex>
    #include <clipping_planes_pars_vertex>
    void main() {
    	#include <color_vertex>
    	#include <begin_vertex>
    	#include <morphtarget_vertex>
    	#include <project_vertex>
    	gl_PointSize = size;
    	#ifdef USE_SIZEATTENUATION
    		bool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );
    		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
    	#endif
    	#include <logdepthbuf_vertex>
    	#include <clipping_planes_vertex>
    	#include <worldpos_vertex>
    	#include <fog_vertex>
    }
  `,
  fragmentShader: `
    #define USE_SIZEATTENUATION
    uniform vec3 diffuse;
    uniform float opacity;
    uniform sampler2D particleSpriteTex;

    #include <common>
    #include <color_pars_fragment>
    #include <map_particle_pars_fragment>
    #include <fog_pars_fragment>
    #include <logdepthbuf_pars_fragment>
    #include <clipping_planes_pars_fragment>
    void main() {
    	#include <clipping_planes_fragment>
    	vec3 outgoingLight = vec3( 0.0 );
    	vec4 diffuseColor = vec4( diffuse, opacity );
    	#include <logdepthbuf_fragment>
    	#include <map_particle_fragment>
    	#include <color_fragment>
    	#include <alphatest_fragment>
    	outgoingLight = diffuseColor.rgb;

      vec4 spriteColor = texture2D( particleSpriteTex, gl_PointCoord );
    	gl_FragColor = vec4( outgoingLight, spriteColor.r );

    	#include <premultiplied_alpha_fragment>
    	#include <tonemapping_fragment>
    	#include <encodings_fragment>
    	#include <fog_fragment>
      if (gl_FragColor.w < 0.11) discard;
    }
  `
}
export default ParticleShader;
