module.exports = function(app){
    app.get('/node_modules/babel-polyfill/dist/:name', function(req, res){
        var fileName = req.params.name;

        res.sendFile(fileName,{
            root:'./node_modules/babel-polyfill/dist/'
        }, function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log(fileName);
            }

        });
    })
}