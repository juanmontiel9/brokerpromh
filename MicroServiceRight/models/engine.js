const {Board, Led} = require('johnny-five');
const MongoClient = require('mongodb').MongoClient;

const mongoose = require('mongoose');

function ModelEngine(){
  let self = this;
  self.myBoard;
  self.myLedFront;
  self.myLedBackward;
  self.myLedLeft;
  self.myLedRight;
  self.currentDir;
  self.direcctions = ['right'];
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
    //self.dbTeam();
    //self.dbAgent().catch(console.error);
    return true;
  };
  self.fnInit = () => {return self.fnTestMoves()};
  self.dbAgent = async function fndbAgent(){
    console.log("Call dbAgent");
      /**
       * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
       * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
       */
      const uri = "mongodb+srv://PrometheusApp:Poli123@prometheusteam-oabpa.gcp.mongodb.net/test?retryWrites=true&w=majority";
      //mongodb+srv://<username>:<password>@cluster0-jsape.mongodb.net/test
      const client = new MongoClient(uri);
      try {
          console.log(client);
          // Connect to the MongoDB cluster
          await client.connect();
          // Make the appropriate DB calls
          await self.ListBD(client);
      } catch (e) {
          //console.log("Call dbAgent Error");
          console.error(e);
      } finally {
          await client.close();
      }
  };
  self.ListBD = async function fnListBD(client){
      console.log("Call ListBD");
      databasesList = await client.db().admin().listDatabases();
      console.log("Databases:");
      databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  };
  self.dbTeam = function fndbTeam (){
    const uri = "mongodb+srv://PrometheusApp:Poli123@prometheusteam-oabpa.gcp.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("test").collection("devices");
      // perform actions on the collection object
      client.close();
    });
    console.log("Call dbTeam");
  };
};

exports = module.exports = new ModelEngine();
