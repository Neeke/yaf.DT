seajs.config({
//    plugins: ['shim'],
    alias: {
        jquery: 'lib/jquery/jquery-1.10.1.js',
        placeholder: 'lib/placeholder/jquery.placeholder.js',
        util: 'app/util/util.js',
        rest: 'lib/rest/rest.js'
    },
    preload: ["jquery"],
    base: '/resources/js/',
    charset: 'utf-8'
});