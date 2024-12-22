import { useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";

function Stars() {
  const [positions, setPositions] = useState(() => {
    // Create random points in a sphere

    const numPoints = 5000;
    const radius = 1.2;

    const points = new Float32Array(numPoints * 3);

    for (let i = 0; i < numPoints; i += 3) {
      const phi = Math.random() * Math.PI * 2; // Random angle around the sphere
      const cosTheta = Math.random() * 2 - 1; // Random cosine of angle from the top of the sphere
      const theta = Math.acos(cosTheta); // Convert cosine to angle

      const r = Math.cbrt(Math.random()) * radius; // Random radius from the center to the surface of the sphere
      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);

      points[i] = x;
      points[i + 1] = y;
      points[i + 2] = z;
    }

    return points;
  });

  useFrame((_, delta) => {
    const rotationSpeedX = delta / 10;
    const rotationSpeedY = delta / 15;

    setPositions((positions) => {
      const rotatedPositions = new Float32Array(positions.length);

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];

        // Rotate around x-axis
        const rotatedX = x;
        const rotatedY =
          y * Math.cos(rotationSpeedX) - z * Math.sin(rotationSpeedX);
        const rotatedZ =
          y * Math.sin(rotationSpeedX) + z * Math.cos(rotationSpeedX);

        // Rotate around y-axis
        const finalRotatedX =
          rotatedX * Math.cos(rotationSpeedY) +
          rotatedZ * Math.sin(rotationSpeedY);
        const finalRotatedY = rotatedY;
        const finalRotatedZ =
          -rotatedX * Math.sin(rotationSpeedY) +
          rotatedZ * Math.cos(rotationSpeedY);

        rotatedPositions[i] = finalRotatedX;
        rotatedPositions[i + 1] = finalRotatedY;
        rotatedPositions[i + 2] = finalRotatedZ;
      }

      return rotatedPositions;
    });
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="white"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function StarsCanvas() {
  return (
    <div className="absolute inset-0 z-[-1] h-auto w-full">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
}
