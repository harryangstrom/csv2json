const fs = require('fs');
const path = require('path');
const csv2json = require('csvtojson');

//Main function: it gets the file to be converted and write a json file with the output.
//Everything is treated async to not block the processes.
const convert = (file) => {
  if (!file) return console.log('Usage: node convert filename [output]'); //if the file does not exist, it prints usage
  const thisfile = path.join(__dirname, file); //path_to_csv_file
  const thatfile = path.join(__dirname, path.basename(thisfile, '.csv') + '.json'); //path_to_json_file
  csv2json()
    .fromFile(thisfile)
    .then((jsonObj) => {
      console.log(jsonObj);
      str = JSON.stringify(jsonObj, null, '\t'); //convert the JSON object to string, formatted output
      //create and write the json file with the content.
      fs.writeFile(thatfile, str, (err) => {
        if (err) throw err;
        console.log("JSON succesfully converted");
      });
    })
}

//entry point to the utility.
convert(process.argv[2]);