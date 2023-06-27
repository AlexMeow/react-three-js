import logo from './logo.svg';
import './Scene.css';
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import img from './map.png'

const Scene = () => {
  // Initialize camera position.
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  
  // Set camera position by useEffect.
  useEffect(() => {
    const update = (e) => {
      console.log(e);
      setMouseX((e.clientX / window.innerWidth) * 2 - 1);
      setMouseY(-(e.clientY / window.innerHeight) * 2 + 1);
      console.log(mouseX, mouseY);
    }
    window.addEventListener('pointermove', update);
    return () => {
      window.removeEventListener('pointermove', update);
    }
  }, [mouseX, mouseY])

  const Cube = () => {
    const mesh = useRef(null);
    // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
    return (
      <>
        <mesh ref={mesh} position={[4, -2, 0]}>
          <boxGeometry attach="geometry" args={[2, 2, 2]} />
          <meshBasicMaterial attach="material" color="blue" />
        </mesh>
        <mesh ref={mesh} position={[2, 0, 4]}>
          <boxGeometry attach="geometry" args={[2, 6, 1]} />
          <meshBasicMaterial attach="material" color="CornflowerBlue" />
        </mesh>
        <mesh ref={mesh} position={[-4, -2, 5]}>
          <boxGeometry attach="geometry" args={[1, 2, 1]} />
          <meshBasicMaterial attach="material" color="CornflowerBlue" />
        </mesh>
        <mesh ref={mesh} position={[5, -4, 12]}>
          <boxGeometry attach="geometry" args={[1, 2, 1]} />
          <meshBasicMaterial attach="material" color="blue" />
        </mesh>
        <mesh ref={mesh} position={[15, -2, 2]}>
          <boxGeometry attach="geometry" args={[1, 2, 1]} />
          <meshBasicMaterial attach="material" color="Aquamarine" />
        </mesh>
        <mesh ref={mesh} position={[8, -6, -10]}>
          <boxGeometry attach="geometry" args={[1, 6, 1]} />
          <meshBasicMaterial attach="material" color="Aquamarine" />
        </mesh>
        <mesh ref={mesh} position={[7, 0, 15]}>
          <boxGeometry attach="geometry" args={[1, 8, 1]} />
          <meshBasicMaterial attach="material" color="Aquamarine" />
        </mesh>
        <mesh ref={mesh} position={[10, -2, 5]}>
          <boxGeometry attach="geometry" args={[2, 2, 2]} />
          <meshBasicMaterial attach="material" color="HoneyDew" />
        </mesh>
      </>

    );
  }

  const Image = () => {
    useThree(({camera}) => {
      camera.position.set(0, 15, 30);
      camera.rotation.set(mouseY, -mouseX, 0);
    });
    const texture = useLoader(THREE.TextureLoader, img);
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5, -5, -5]}>
        <planeGeometry attach="geometry" args={[100, 100]} />
        <meshBasicMaterial attach="material" map={texture} />
      </mesh>
    )
  }

  return (
    <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}>
      <Image />
      <Cube position={[-1.2, 0, 0]}/>
      <Cube position={[0, 0, 0]}/>
      <Cube />
    </Canvas>
  );
}

export default Scene;
