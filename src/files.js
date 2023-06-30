require('./css/root.styl')

//extension icons
let req = require.context("./assets/extension/", false);
req.keys().forEach(function(key){
    req(key);
});
