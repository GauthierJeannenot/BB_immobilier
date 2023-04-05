module.exports = class Dashboard {
    print(request, response) {
        if(typeof request.session.user !== 'undefined') {
            response.render('admin/dashboard/index');
            return;
        }
        request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
        response.redirect('/connexion');  
    }
};
