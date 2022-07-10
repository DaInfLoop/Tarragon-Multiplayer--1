const { Engine, World, Bodies, Vector, Collision, SAT, Common } = Matter;
const bd = Matter.Body;
Common.setDecomp(decomp);

// Base game vars
let scene = "menu";
let level = 0;
let nextLevel = false;
let textFade = 255;
let gameBg = "Ice";
let bgOverlay = `rgba(0, 0, 0, 0)`;
let csc = 0;
let msgs = [];
let csy = 0;
let textFinished = [];
let cutDone = false;
// Forest, Fire, Ice, Stone, and Portal are all existing platformer themes

// Our world and engine
let world, engine, player;

// An array of all bodies
let bodies = [];
let particles = [];

// What keys are currently being pressed down
let keys = [];

// If a click has been executed
let clicked = false;
let currentKeyReleased = false;
let mir = false; // mouseIsReleased

// Misc variables
let peppers = []
let goldenPepperCount = 0;              