let req;
try { 
    req = require.context("./img", true, /\.(?:png|jpe?g|gif|tiff)$/im);
    req.keys().forEach((key) => req(key));
} catch(ex){} 

req = require.context("./", true, /\.less$/im);
req.keys().forEach((key) => req(key));

console.log("custom script is executing...")