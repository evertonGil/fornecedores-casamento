var fs = require('fs');
var logger = require('../services/logger');
var mongoose = require('mongoose');
var model = mongoose.model('Fornecedores');
var api = {};
var root = './public';
var repoFornecedores = '/uploads/fornecedores';

api.adiciona = function(req, res){
    console.log("rota upload acessada");

    

    var subdiretorio = req.headers.subdiretorio;
    var arquivo = req.headers.filename;
    var id = req.headers.idfornecedor;

    var mkdirUrl = `${root}${repoFornecedores}/${subdiretorio}`;
    var pathArquivo = `${mkdirUrl}/${arquivo}`;
    var urlPublica = `${repoFornecedores}/${subdiretorio}/${arquivo}`;
    var jaExistia = false;

    if(!id){
        logger.log('error', 'IdFornecedor undefined');
        res.status(400).send('IdFornecedor undefined');
        return;
    }

    model
    .update(
        {"_id": id },
        {
            $addToSet: {
                "anexos": {
                    "link": urlPublica
                }
            }
        }
    )
    .then(function(respostaDb){
        
        fs.mkdir(mkdirUrl,function(err){
            if(err){
                fs.stat(pathArquivo, function(error, stats){
                    if(stats){
                        jaExistia = true; 
                    }
                    if(error){
                        logger.log('error', error);
                    }                    
                });
            }
        });
        req.pipe(fs.createWriteStream(pathArquivo))
        .on('finish', function(){
            console.log("arquivo criado via post: " + pathArquivo);
            
            res.status(201).send({"statusFile":{"pathFile": urlPublica , "jaExistia": jaExistia}, "statusDB": respostaDb});
            
        });

    }, function(error){
        logger.log('error', error);
        res.status(500).json(error);
    });

    

};

api.deleta = function(req, res){
    var id = req.headers.idfornecedor;
    var link = `${repoFornecedores}/${req.params.subdir}/${req.params.filename}`;
    console.log("_id:", req.headers.idfornecedor);
    //console.log('filename',req.params.filename);
    //console.log('subdir',req.params.subdir);
    if(!id){
        logger.log('error', 'IdFornecedor undefined');
        res.status(400).send('IdFornecedor undefined');
        return;
    }
    
    model
    .update(
        {"_id": id },
        {
            $pull: {
                "anexos": {
                    "link": link
                }
            }
        }
    )
    .then(function(respostaDb){
        logger.log('info', `Anexo "${link}" removido do Fornecedor: ${id}`);
        console.log(`Anexo: ${link}`);

        fs.unlink(`${root}${repoFornecedores}/${req.params.subdir}/${req.params.filename}`,function(error){
            if(error){
                if(error.code == "ENOENT"){
                    res.send({"statusFile": {
                       "code": "ENOENT",
                       "message": "Arquivo não encontrado"
                    }, "statusDB": respostaDb});
                }
                else{
                    logger.log('error', error);
                }
            }
            else{
                res.send({"statusFile": {
                    "code": "EEXIST",
                    "message": "Arquivo Removido"
                }, "statusDB": respostaDb });
            }

        }, function(error){
            logger.log('error', error);
            res.status(500).json(error);
        });
    });
}


module.exports = api;