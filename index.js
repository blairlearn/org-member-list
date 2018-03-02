const https = require('https');
const forEach =  require('array-foreach');

const GITHUB_TOKEN = process.env["GITHUB_TOKEN"];

if(!GITHUB_TOKEN) {
    console.error("The GITHUB_TOKEN environment variable has not been set.");
    process.abort();
}

GetUsers();

function GetUsers(){
    var options = {
        //'https://api.github.com/orgs/nciocpl/teams';
        protocol: 'https:',
        hostname: 'api.github.com',
        path: '/orgs/nciocpl/members',
        method: 'GET',
        headers: {
            'User-Agent': 'Organization User Lister',
            'Authorization': `token ${GITHUB_TOKEN}`
        }
    };

    https.get(options, (res) => {
        let userData = '';

        res.on('data', (d) => {
            userData += d;
        });

        res.on('end', () => {
            let users = JSON.parse(userData);

            users.forEach(user => {
                console.log(user.login);
            });
        });
    }).on('error', (e) => {
        console.error(e);
    });
}