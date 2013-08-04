seajs.config({
    plugins: ['shim', 'text'],
    alias: {
        jquery: 'lib/jquery/jquery-1.10.1.js',
        placeholder: 'lib/placeholder/jquery.placeholder.js',
        util: 'app/util/util.js',
        rest: 'lib/rest/rest.js',
        dk: 'lib/dk/dk.customer.js',
        plupload: 'lib/plupload/plupload.full.js',
        imagescale: 'lib/imagescale/jquery.imagescale.js',
        jqueryui: 'lib/jqueryui/jquery-ui-1.10.3.custom.js',
        validate: 'lib/validate/validate.customer.js',
        doT: 'lib/doT/doT.js',
        jcrop: 'lib/jcrop/jquery.Jcrop.js',
        tipTip: 'lib/tipTip/jquery.tipTip.js',
        lazyload:'lib/lazyload/jquery.lazyload.js'
    },
    shim: {
        plupload: {
            deps: [''],
            exports: 'plupload'
        },
        'validate.zh': {
            deps: ['validate']
        }
    },
    preload: ["jquery", '/resources/js/lib/seajs/seajs-text.js'],
    debug: true,
    base: '/resources/js/',
    charset: 'utf-8'
});