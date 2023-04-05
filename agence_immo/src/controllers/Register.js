const RepoUser = require('../repository/User');
module.exports = class Register {
    print(req, res) {
        res.render('register/form');  
    }


    process(req, res) {
        let entity = {
            email : req.body.email || '',
            password : req.body.password || '', // devra être hashé
            civility : req.body.civility || '',
            firstname: req.body.firstname || '',
            lastname: req.body.lastname || '',
            phone: req.body.phone || ''
        };
 
        let repo = new RepoUser();        
        repo.emailExists(entity.email).then((result) => {
            // si l'email existe deja dans la bdd
            if(result === true) {
                res.render('register/form', { 
                    error : `Cette adresse email existe déjà`, 
                    form : entity 
                }); 
            } else {
                let bcrypt = require('bcryptjs');
                entity.password = bcrypt.hashSync(entity.password, bcrypt.genSaltSync(10));
                // sinon on tente de le créer
                repo.add(entity).then((user) => {
                    req.flash('notify', 'Votre compte a bien été créé.');
                    res.redirect('/');
                }, (err) => {
                    res.render('register/form', { 
                        error : `L'enregistrement en base de données a échoué`, 
                        form : entity 
                    }); 
                });
            }
        });

        
    }
};
