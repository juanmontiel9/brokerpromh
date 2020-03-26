const {Board, Led} = require('johnny-five');

function ModelEngine(){
  let self = this;
  self.myBoard;
  self.myLedFront;
  self.myLedBackward;
  self.myLedLeft;
  self.myLedRight;
  self.currentDir;
  self.direcctions = ['front'];
  self.myBoard = new Board();
  self.myBoard.on('ready', () =>{
    self.myLedFront = new Led(9);
    self.myLedBackward = new Led(12);
    self.myLedLeft = new Led(11);
    self.myLedRight = new Led(10);
    if (self.fnInit()){
      self.myBoard.repl.inject({
        move: self.fnChangeDirection,
        stop: self.fnStop
      });
    }
  });

  self.myBoard.on('error', (err) => {
    console.log(err);
  });

  self.fnStop = () => {
    let result = {status:'OK',message:'Stoped'};
    self.myLedFront.off();
    self.myLedBackward.off();
    self.myLedLeft.off();
    self.myLedRight.off();
    return result;
  };

  self.fnChangeDirection = (toDirection) => {
    let result = {status:'OK',message:'Moving to ' + toDirection };
    self.fnStop();
    switch (toDirection) {
      case 'front':
        self.myLedFront.on();
        break;
      case 'backward':
        self.myLedBackward.on();
        break;
      case 'left':
        self.myLedLeft.on();
        break;
      case 'right':
        self.myLedRight.on();
        break;
      default:
        result.status = 'Fail';
        result.message = 'Invalid direcction value';
      break;
    }
    return result;
  };
  self.fnTestMoves = () => {
    console.log('Start Test Engine');
    self.direcctions.map((dir)=>{
      console.log(self.fnChangeDirection(dir));
    });
    console.log(self.fnStop());
    console.log('Finish Test Engine');
    return true;
  };
  self.fnInit = () => {return self.fnTestMoves();};
};

exports = module.exports = new ModelEngine();
