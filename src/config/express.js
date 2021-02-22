const express = require('express');
const handlebars = require('express-handlebars');


const c = ()=>{
return {title:"Testing"}

}

module.exports = (app, config) => {

    app.use(express.static(config.root + "/public" ));

    
    app.engine('handlebars', handlebars({
        layoutsDir: config.root + '/app/views/layouts/',
        defaultLayout: 'main',
        partialsDir: [config.root + '/app/views/partials']
    }));
    app.set('views', config.root + '/app/views/');
    app.set('view engine', 'handlebars');


    app.get('/', (req, res, next) => {
        return res.render("index", c());
    })
    return app;
}