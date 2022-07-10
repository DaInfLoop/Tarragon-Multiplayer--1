let config = {
  world: {
    gravity: 2.25,
    maxYVel: 25,
    blockSize: 60,
    camera: true,
    cameraFriction: 5
  },
  player: {
    width: 50,
    height: 100,
    jumpForce: 0.275,
    speed: 7,
    acceleration: 0.5,
    decceleration: 5,
    dashTime: 50,
    actions: ["wall jump", "dash"],
  },
}