var moment = require('moment');

var generatemessage = (from,text)=>{
  return{
    from,
    text,
    createdat:moment().valueOf()
  };
};
var generatelocation = (from,lat,lon)=>{
  return{
    from,
    url:`https://www.google.com/maps?q=${lat},${lon}`,
    createdat:moment().valueOf()
  };
};




module.exports = {generatemessage,generatelocation};
