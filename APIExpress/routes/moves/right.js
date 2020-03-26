var express = require('express');
var router = express.Router();
var engineRouter = require('../../models/engine');
/* GET contact listing. */
router.get('/', (req, res, next) => {
   var opResult = engineRouter.fnChangeDirection("right");
   if (typeof(opResult) == "object"){
     if (opResult.hasOwnProperty("status") && opResult.hasOwnProperty("message")){
       res.render((opResult.status == "OK")? 'move' :'fail', { title: 'Moving Remote Car', direcction: opResult.message });
     }
   }
   next();
 });

module.exports = router;
