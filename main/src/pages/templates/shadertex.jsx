import { useEffect } from 'react';
import { useRef } from 'react';
import * as THREE from 'three';

export default function ShaderTex({ frag, parent }) {
  const canvas = useRef();
  
  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ canvas: canvas.current });
    renderer.setSize(parent.current.clientWidth, parent.current.clientHeight);
    
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      fragmentShader: frag,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      }
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const animate = (time) => {
      material.uniforms.u_time.value = time / 1000;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const onResize = () => {
      renderer.setSize(parent.current.clientWidth, parent.current.clientHeight);
      material.uniforms.u_resolution.value.set(parent.current.clientWidth, parent.current.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, [frag]);

  return (
    <canvas ref={canvas}></canvas>
  );
}