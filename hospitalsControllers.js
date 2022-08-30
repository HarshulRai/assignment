const axios = require("axios");
const fs = require('fs');
const path = require('path');
const moment = require('moment');

exports.getHospitals = async (req, res) => {
    const { district_id, date, limit } = req.body;
        let check = moment(date, "DD-MM-YYYY", true).isValid();
        let Limit=limit || 10; 
        if(!check) {  
      return res.status(500).json({ code: 500, message: "Invalid date entered" });
        }
    if(typeof district_id!=='number'||typeof date!=='string'||typeof Limit!=='number'||limit<0){
        return res.status(500).json({ code: 500, message: "Invalid data entered" });
    }  
      
    axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district_id}&date=${date}`)
      .then((result) => {
        let finalFile = [];  
        let datacenters = result.data.centers;
        for(let i=0;i<Limit;i++){       
            let checkArray = [];
            for(let j=0;j<datacenters[i].sessions.length;j++){
 checkArray.push({available_capacity: datacenters[i].sessions[j].available_capacity,vaccine: datacenters[i].sessions[j].vaccine});
            }  
          let data = {name: datacenters[i].name,sessions: checkArray};
           finalFile.push(data);
            } 
        res.json({code: 200,message: "Hospitals sent successfully",result: finalFile, }); 
  
fs.writeFile( path.join(__dirname, "..", "hospitals.txt"), JSON.stringify(finalFile),(err) => {
                   if (err) 
                   {
                    throw err;
                   }
                 }
               ); 
 
    })
      .catch((err) => { 
        res.json(err);
      });
};

   