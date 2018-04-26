var generatemessage = (from,text)=>{
  return{
    from,
    text,
    createdat:new Date().getTime()
  };
};
var generatelocation = (from,lat,lon)=>{
  return{
    from,
    url:`https://www.google.com/maps?q=${lat},${lon}`,
    createdat:new Date().getTime()
  };
};





module.exports = {generatemessage,generatelocation};
