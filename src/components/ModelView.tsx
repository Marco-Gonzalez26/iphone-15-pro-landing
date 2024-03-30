import { Html, OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import { Lights } from './Lights'
import { Suspense } from 'react'
import { IPhone } from './IPhone'
import * as THREE from 'three'
import { Loader } from './Loader'
export const ModelView = ({
  idx,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item
}) => {
  return (
    <View
      index={idx}
      id={gsapType}
      className={`w-full h-full absolute ${idx === 2 ? 'right-[-100%]' : ''}`}>
      {/*Ambient Light */}
      <ambientLight intensity={10} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />
      <group
        ref={groupRef}
        name={`${idx === 1 ? 'small' : 'large'}`}
        position={[0, 0, 0]}>
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={idx === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  )
}
