const RepoRealty = require('../repository/Realty');
module.exports = class Realty {
    print(request, response) {
        if(typeof request.session.user === 'undefined') {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
        }
        response.render('admin/realty/list');
    }

    printForm(request, response) {
        if(typeof request.session.user === 'undefined') {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
        }
        response.render('admin/realty/form', { form : { address : {}, contact : {}}});
    }

    processForm(request, response) {  
        if(typeof request.session.user === 'undefined') {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
        }
        const entity = request.body.realty || {};
        entity.agent_immobilier = request.session.user;
        entity.address = request.body.address || {};
        entity.contact = request.body.contact || {};

        const repo = new RepoRealty();
        repo.add(entity).then((realty) => {
            request.flash('notify', 'Le bien a été créé.');
            response.redirect('/admin/realty');
        }, (err) => {
            response.render('admin/realty/form', { 
                error : `L'enregistrement en base de données a échoué`, 
                form : entity 
            }); 
        });
    }

};
  