import React from "react";
import dynamic from "next/dynamic";

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

const CANVAS_RESIZE = 1;
let CANVAS_HEIGHT = 420 * CANVAS_RESIZE;
let CANVAS_WIDTH = 1920 * CANVAS_RESIZE;

let NUM_ATOMS = 40;

const MAX_DIA = 7;
const MIN_DIA = 1;
const MAX_SPEED = 0.3;
const MAX_DIA_CHANGE_SPEED = 0.1;

let MAX_BONDING_DISTANCE = 8000;
let MAX_STRONG_BONDING_DISTANCE = 3000;

const atoms = [];

/**
 * Function to handle change in window width and height and resize p5 canvas accordingly
 * @function
 * @param {number} windowWidth - New window width
 * @param {number} windowHeight - New window height
 * @return {void}
 */
function updateP5ParametersBasedOnWindowDimensions(windowWidth, windowHeight) {
  CANVAS_HEIGHT = 400;
  CANVAS_WIDTH = windowWidth;

  if (windowWidth < 1280) {
    NUM_ATOMS = 30;
    CANVAS_HEIGHT = 300;
    MAX_BONDING_DISTANCE = 6000;
    MAX_STRONG_BONDING_DISTANCE = 2000;
  }

  if (windowWidth < 600) {
    NUM_ATOMS = 20;
    MAX_BONDING_DISTANCE = 3000;
    MAX_STRONG_BONDING_DISTANCE = 1000;
  }
}
/**
 * class representing an Atom
 * @class
 */
class Atom {
  /**
   * Constructor function to create a new Atom object
   * @constructor
   *
   * @param {number} dia - diameter of the atom
   * @param {number} x - x-coordinate of the atom
   * @param {number} y - y-coordinate of the atom
   * @param {number} vx - velocity of x-coordinate of the atom
   * @param {number} vy - velocity of y-coordinate of the atom
   * @param {number} vd - rate at which the diameter changes
   * @param {object} p5 - reference to p5 object to access p5 functions
   */
  constructor(dia, x, y, vx, vy, vd, p5) {
    this.dia = dia;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.vd = vd;
    this.p5 = p5;
  }
  /**
   * Move the atom
   * @param {object} p5 - p5 object to access p5 functions
   */
  move(p5) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > CANVAS_WIDTH) {
      this.vx = this.vx * -1;
    }

    if (this.y < 0 || this.y > CANVAS_HEIGHT) {
      this.vy = this.vy * -1;
    }

    this.dia += this.vd;
    if (this.dia < MIN_DIA || this.dia > MAX_DIA) {
      this.vd = this.vd * -1;
    }
  }
}
/**
 * function to calculate the distance between two atoms
 * @function
 *
 * @param {Atom} a - first atom
 * @param {Atom} b - second atom
 * @param {object} p5 - reference p5 object to access p5 functions
 * @return {number} distance between the two atoms
 */
function distanceSq(a, b, p5) {
  return p5.pow(a.x - b.x, 2) + p5.pow(a.y - b.y, 2);
}
/**
 * function to form bond between two atoms
 * @function
 *
 * @param {Atom} a - first atom
 * @param {Atom} b - second atom
 * @param {number} separation - distance between the two atoms
 * @param {object} p5 - reference to p5 object to access p5 functions
 */
function formBond(a, b, separation, p5) {
  // Setting the pen stroke color to Argent(A shade of Gray)
  p5.stroke(p5.color(192, 192, 192));
  if (separation > MAX_BONDING_DISTANCE) {
    return;
  }
  if (separation < MAX_STRONG_BONDING_DISTANCE) {
    p5.strokeWeight(0.8);
  }
  p5.line(a.x, a.y, b.x, b.y);
  p5.strokeWeight(0.3);
}

/**
 * BouncingAtoms component that renders an interactive animation of bouncing atoms
 * @component
 * @param {object} props - the component props
 * @return {JSX} Sketch component with setup, draw, windowResized, and mouseClicked props
 */
export default function BouncingAtoms(props) {
  /**
   * Function to set up the canvas and initial atom positions
   * @function
   * @param {object} p5 - p5 object to access p5 functions
   * @param {object} canvasParentRef - reference to the canvas parent element
   */
  const setup = (p5, canvasParentRef) => {
    updateP5ParametersBasedOnWindowDimensions(p5.windowWidth, p5.windowHeight);
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);

    for (let i = atoms.length; i < NUM_ATOMS; i++) {
      p5.append(
        atoms,
        new Atom(
          p5.random(MIN_DIA, MAX_DIA),
          p5.random(0, CANVAS_WIDTH),
          p5.random(0, CANVAS_HEIGHT),
          p5.random(-MAX_SPEED, MAX_SPEED),
          p5.random(-MAX_SPEED, MAX_SPEED),
          p5.random(-MAX_DIA_CHANGE_SPEED, MAX_DIA_CHANGE_SPEED)
        )
      );
    }
  };

  /**
   * Function to draw on the canvas
   * @function
   * @param {object} p5 - p5 object to access p5 functions
   */
  const draw = (p5) => {
    p5.clear();

    for (let i = 0; i < atoms.length; i++) {
      for (let j = i + 1; j < atoms.length; j++) {
        const distance = distanceSq(atoms[i], atoms[j], p5);
        formBond(atoms[i], atoms[j], distance, p5);
      }
    }

    for (const atom of atoms) {
      atom.move(p5);
      p5.circle(atom.x, atom.y, atom.dia);
    }
  };

  /**
   * Function to handle mouse click events and create new atoms
   * @function
   * @param {object} p5 - p5 object to access p5 functions
   */
  const mouseClicked = (p5) => {
    p5.append(
      atoms,
      new Atom(
        p5.random(MIN_DIA, MAX_DIA),
        p5.mouseX,
        p5.mouseY,
        p5.random(-MAX_SPEED, MAX_SPEED),
        p5.random(-MAX_SPEED, MAX_SPEED),
        p5.random(-MAX_DIA_CHANGE_SPEED, MAX_DIA_CHANGE_SPEED)
      )
    );
  };

  /**
   * Function to update canvas dimensions on window resize
   * @function
   * @param {Object} p5 - reference to p5 object to access p5 functions
   */
  const windowResized = (p5) => {
    updateP5ParametersBasedOnWindowDimensions(p5.windowWidth, p5.windowHeight);
    p5.resizeCanvas(p5.windowWidth, CANVAS_HEIGHT);
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      mouseClicked={mouseClicked}
    />
  );
}
