//ISSUE: p5.width and p5.height are undefined. Hardcoded them to 1920 and 540 for now.

import React from "react";
import dynamic from "next/dynamic";
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

const CANVAS_RESIZE = 1;
let CANVAS_HEIGHT = 420 * CANVAS_RESIZE;
let CANVAS_WIDTH = 1920 * CANVAS_RESIZE;

const NUM_MOLECULES = 5;
const NUM_ATOMS = 40;

const MIN_N = 3;
const MAX_N = 5;
const MIN_RADIUS = 30;
const MAX_RADIUS = 30;

const MAX_DIA = 9;
const MIN_DIA = 2;
const MAX_SPEED = 1.5;
const MAX_DIA_CHANGE_SPEED = 0.1;

const MAX_BONDING_DISTANCE = 8000;
const MAX_STRONG_BONDING_DISTANCE = 3000;

const atoms = [];

function updateCanvasHeightBasedOnWindowWidth(windowWidth, windowHeight) {  
    CANVAS_HEIGHT = windowHeight/2 - 80;
    
    if (windowWidth < 480) {
      CANVAS_HEIGHT = windowHeight/3;
    }
}

function createMolecule(n, x, y, r, d, vx, vy, p5) {
  // console.log({n});
  let angle = TWO_PI / n;
  let a = 0;
  for (let i = 0; i < n; i += 1) {
    let ax = x + p5.cos(a) * r;
    let ay = y + p5.sin(a) * r;
    p5.append(atoms, new Atom(d, ax, ay, vx, vy, 0));
    a = a + angle;
  }
}

class Atom {
  constructor(dia, x, y, vx, vy, vd, p5) {
    this.dia = dia;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.vd = vd;
    this.p5 = p5;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > 1920) {
      this.vx = this.vx * -1;
    }

    // console.log(540);
    if (this.y < 0 || this.y > 420) {
      this.vy = this.vy * -1;
    }

    this.dia += this.vd;
    if (this.dia < MIN_DIA || this.dia > MAX_DIA) {
      this.vd = this.vd * -1;
    }
  }
}

function distanceSq(a, b, p5) {
  return p5.pow(a.x - b.x, 2) + p5.pow(a.y - b.y, 2);
}

function formBond(a, b, separation, p5) {
  p5.stroke(p5.color(192, 192, 192));
  if (separation > MAX_BONDING_DISTANCE) {
    return;
  }
  if (separation < MAX_STRONG_BONDING_DISTANCE) {
    p5.strokeWeight(1);
  }
  p5.line(a.x, a.y, b.x, b.y);
  p5.strokeWeight(0.3);
}
export default (props) => {
  const setup = (p5, canvasParentRef) => {
    updateCanvasHeightBasedOnWindowWidth(p5.windowWidth, p5.windowHeight);
    p5.createCanvas(p5.windowWidth, CANVAS_HEIGHT).parent(canvasParentRef);

    for (let i = 0; i < NUM_ATOMS; i++) {
      p5.append(
        atoms,
        new Atom(
          p5.random(MIN_DIA, MAX_DIA),
          p5.random(0, 1920),
          p5.random(0, 420),
          p5.random(-MAX_SPEED, MAX_SPEED),
          p5.random(-MAX_SPEED, MAX_SPEED),
          p5.random(-MAX_DIA_CHANGE_SPEED, MAX_DIA_CHANGE_SPEED)
        )
      );
    }
  };

  const draw = (p5) => {
    p5.clear();

    for (let i = 0; i < atoms.length; i++) {
      for (let j = i + 1; j < atoms.length; j++) {
        const distance = distanceSq(atoms[i], atoms[j], p5);
        formBond(atoms[i], atoms[j], distance, p5);
      }
    }

    for (let atom of atoms) {
      atom.move();
      p5.circle(atom.x, atom.y, atom.dia);
    }
  };

  const windowResized = (p5) => {
    updateCanvasHeightBasedOnWindowWidth(p5.windowWidth, p5.windowHeight);
    p5.resizeCanvas(p5.windowWidth, CANVAS_HEIGHT);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};
