import React, { useEffect, useRef } from "react";

const Cube = () => {
  const ref: any = useRef();
  const BG = "black";
  const cubeColor = "yellow";
  const speedX = 0.05;
  const speedY = 0.15;
  const speedZ = 0.1;
  let timeDelta,
    timeLast = 0;
  const h = document.documentElement.clientHeight;
  const w = document.documentElement.clientWidth;
  const POINT3D = (x: any, y: any, z: any) => {
    return { x, y, z };
  };
  // cube parameters
  const cx = w / 2;
  const cy = h / 2;
  const cz = 0;
  const size = h / 4;
  const vertices: any = [
    POINT3D(cx - size, cy - size, cz - size),
    POINT3D(cx + size, cy - size, cz - size),
    POINT3D(cx + size, cy + size, cz - size),
    POINT3D(cx - size, cy + size, cz - size),
    POINT3D(cx - size, cy - size, cz + size),
    POINT3D(cx + size, cy - size, cz + size),
    POINT3D(cx + size, cy + size, cz + size),
    POINT3D(cx - size, cy + size, cz + size),
  ];

  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0], // back face
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4], // front face
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7], // connecting sides
  ];
  const loop = (timeNow: any) => {
    const c = ref.current && ref.current.getContext("2d");
    c.beginPath();
    c.strokeStyle = cubeColor;
    c.lineWidth = 10;
    c.lineCap = "round";
    // calculate the time difference
    timeDelta = timeNow - timeLast;
    timeLast = timeNow;

    // background
    c.fillRect(0, 0, w, h);
    // rotate the cube along the z axis
    let angle = timeDelta * 0.001 * speedZ * Math.PI * 2;
    for (let v of vertices) {
      let dx = v.x - cx;
      let dy = v.y - cy;
      let x = dx * Math.cos(angle) - dy * Math.sin(angle);
      let y = dx * Math.sin(angle) + dy * Math.cos(angle);
      v.x = x + cx;
      v.y = y + cy;
    }

    // rotate the cube along the x axis
    angle = timeDelta * 0.001 * speedX * Math.PI * 2;
    for (let v of vertices) {
      let dy = v.y - cy;
      let dz = v.z - cz;
      let y = dy * Math.cos(angle) - dz * Math.sin(angle);
      let z = dy * Math.sin(angle) + dz * Math.cos(angle);
      v.y = y + cy;
      v.z = z + cz;
    }
    // draw each edge
    for (let edge of edges) {
      c.beginPath();
      c.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
      c.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
      c.stroke();
    }

    // call the next frame
    requestAnimationFrame(loop);
  };


  useEffect(() => {
    requestAnimationFrame(loop);
  }, []);
  return (
    <canvas
      ref={ref}
      style={{ border: "1px solid #fff" }}
      width={w}
      height={h}
    />
  );
};

export default Cube;
