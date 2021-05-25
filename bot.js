require('dotenv').config();
const fetch = require('node-fetch');

const Discord = require('discord.js');
const client = new Discord.Client({
    partials: ["MESSAGE"]
});




const idx = {
    '0': {
            'q': 'How would you implement a session-based authentication in an Express application?',
            'a': 'We can use the `express-session` package to create session middleware.\n\nThe session will create a cookie that is passed back and forth between the server and client.\n\nWe can set values on our session to indicate that we have been authenticated. On subsequent requests, when we read the cookie we see that we were logged in previously and can see who the user is.\n\nWith each request that comes in, we check if the authorization key has been created on the session previously. If it has been, we find the user\'s information and add it in to the local response variables in order to be able to use this information in subsequent middleware or routes.'
         },

    '1': {
            'q': 'What requirements will you need in app.js in order to setup express-session?',
            'a': 'const session = require(\'express-session\');\nconst cookieParser = require(\'cookie-parser\');\nconst { sessionSecret } = require(\'./config\');\nconst { restoreUser } = require(\'./auth\');\n\napp.use(cookieParser(sessionSecret));\n\napp.use(session({\nname: \'amusement-park-tracker.sid\',\nsecret: sessionSecret,\nresave: false,\nsaveUninitialized: false,\n})\n);\n\napp.use(restoreUser);'
         },

    '2': {
            'q': 'In auth.js, how do you set up function to create a session when a user logs in?',
            'a': 'const loginUser = (req, res, user) => {\nreq.session.auth = {\nuserId: user.id,\n};\n};'
         },

    '3': {
            'q': 'In auth.js, how do you set up function to remove a session when a user logs out?',
            'a': 'const logoutUser = (req, res) => {\ndelete req.session.auth;\n};'
         },

    '4': {
            'q': 'In auth.js, how do you set up a middleware that can be appended to any path based on the user\'s authentication?',
            'a': 'const requireAuth = (req, res, next) => {\nif (!res.locals.authenticated) {\nreturn res.redirect(\'/user/login\');\n}\nreturn next();\n};' 
         },

    '5': {
            'q': 'In auth.js, how do you setup a function to restore a session to an existing user?',
            'a': 'const restoreUser = async (req, res, next) => {\nif (req.session.auth) {\nconst { userId } = req.session.auth;\ntry {\nconst user = await db.User.findByPk(userId);\nif (user) {\nres.locals.authenticated = true;\nres.locals.user = user;\nnext();\n}\n} catch (err) {\nres.locals.authenticated = false;\nnext(err);\n}\n} else {\nres.locals.authenticated = false;\nnext();\n}\n};\n\n'
         },

    '6': {
            'q': 'How would you setup app.js to store the session information in a database instead of local memory?',
            'a': 'Utilize npm package - "connect-pg-simple"\nconst express = require(\'express\');\nconst session = require(\'express-session\');\nconst store = require(\'connect-pg-simple\');\nconst app = express();\napp.set(\'view engine\', \'pug\');\napp.use(\nsession({\nstore: new (store(session))(),\nsecret: \'a5d63fc5-17a5-459c-b3ba-6d81792158fc\',\nresave: false,\nsaveUninitialized: false,\n})\n);'
         },

    '7': {
            'q': 'Define Asymmetric encryption',
            'a': 'Asymmetric encryption uses two keys, a public key to encrypt and a private key to decrypt.Asymmetric encryption uses two keys, a public key to encrypt and a private key to decrypt.'
         },

    '8': {
            'q': 'Define Bcrypt',
            'a': 'Bcrypt is a strong password hashing algorithm.'
         },

    '9': {
            'q': 'Difference between Authentication and Authorization',
            'a': 'Authentication is the process of identifying an actor given known credentials whereas authorization is the process of checking privileges for an identified actor.'
         },

    '10': {
            'q': 'Express middleware package to implement Cross-Site Resource Sharing',
            'a': 'cors'
         },

    '11': {
            'q': 'Define express-bearer-token',
            'a': 'Express middleware package that extracts a bearer token from a request.'
         },
    '12': {
            'q': 'Define express.json()',
            'a': 'Built-in middleware that allows to parse the body of an HTTP request containing data formatted in json.'
         },
    '13': {
            'q': 'For an Album model, write RESTful endpoints to handle getting all the resources, creating a single resource, updating a single resource and deleting all resources.',
            'a': 'getting all resources -> GET /albums\ncreating a single resource -> POST /albums\nupdating a single resource -> PATCH /album/:id\ndeleting all resources -> DELETE /albums'
         },
    '14': {
            'q': 'What are the HTTP request methods',
            'a': 'GET - Requests a resource\nPOST - Creates a resource\nPUT - Updates a resource\nPATCH - A partial modification to a resource.\nDELETE - Deletes the specified resource.'
         },
    '15': {
            'q': 'What does JWT stand for?',
            'a': 'JSON Web Token'
         },
    '16': {
            'q': 'What does REST stand for?',
            'a': 'Representational State Transfer - it is not a standard, just a convention.'
         },
    '17': {
            'q': 'Define Symmetric Encryption',
            'a': 'Symmetric encryption uses one value to determine how to encrypt and decrypt data.'
         },
    '18': {
            'q': 'What is a cryptographic salt?',
            'a': 'A salt is small, random string or set of bits that gets appended to a user\'s password before hashing it, making rainbow attacks very impractical.'
         },
    '19': {
            'q': 'What is a Rainbow Attack?',
            'a': 'A rainbow attack involves hashing common passwords and searching for the results in a database.'
         },
    '20': {
            'q': 'What is hashing?',
            'a': 'Hashing is the process of converting a message of any length into a short, fixed-length string. Hashed values cannot be translated back to their original input values.'
         },
    '21': {
            'q': 'What is OAuth?',
            'a': 'A protocol that allows Internet users to grant applications access to their information via a trusted third party.'
         },
    '22': {
            'q': 'What is the purpose of auth tokens?',
            'a': 'An application uses the access token to gain access to the user\'s data from the service API. Auth tokens do not have encryption or decryption properties.'
         },
    '23': {
            'q': 'What is the purpose of the JWT signature?',
            'a': 'JWTs don\'t make the data unavailable. A JWT signature is generated from the header, payload and a secret key to ensure that no malicious actor has tampered with the data. It is impossible to generate a valid signature without a secret key.'
         },
    '24': {
            'q': '_____ is a way to use algorithms and secret keys to keep information secure',
            'a': 'Cryptography'
         },
    '25': {
            'q': '_____ is the process of translating something that\'s readable into something thats non-readable',
            'a': 'Encryption'
         },
    '26': {
            'q': '______ is a password hashing function that\'s widely used to hash user passwords',
            'a': 'BCrypt'
         },
    '27': {
            'q': '______ is the process of converting a message of any length into a short, fixed-length string.',
            'a': 'Hashing'
         },
    '28': {
            'q': 'Asymmetric encryption uses how many pieces of info and what are they?',
            'a': 'Asymmetric data uses 2 pieces of Info\nA Public Key - to encrypt\nA Private Key - to decrypt'
         },
    '29': {
            'q': 'Can Hashed value be translated back to their original values?',
            'a': 'nope, because it loses bits of its original message.'
         },
    '30': {
            'q': 'What are the 2 types of encryption?',
            'a': 'Symmetric and Asymmetric'
         }, 
    '31': {
            'q': 'What is a hashed password often called?',
            'a': '"password digest"'
         }, 
    '32': {
            'q': 'What is it called when you generate a small random string or set of bits and append it a users password before hashing?',
            'a': 'salting - this guarantees a unique password digest to store in the database'
         }, 
    '33': {
            'q': 'When is it a good idea to use encryption?',
            'a': '- to secure over the wire communication between the client and the server.\n- Data at rest (Like credit card numbers)'
         }, 
    '34': {
            'q': 'Implement a strong hash function using bcrypt to securely store passwords',
            'a': 'const bcrypt = require(\'bcryptjs\');\n\nasync function getHash(password, saltRounds) {\nconst hash = await bcrypt.hash(password, saltRounds);\nconsole.log(hash);\nreturn hash;\n}\n\nasync function isPassword(password, hash) {\nconst isPassword = await bcrypt.compare(password, hash);\nconsole.log(isPassword);\nreturn isPassword;\n}'
         }, 
    '35': {
            'q': 'A protocol for authenticating users via a trusted 3rd party',
            'a': 'OAuth'
         }, 
    '36': {
            'q': 'Checking a user\'s priveleges is an example of ...',
            'a': 'Authorization'
         }, 
    '37': {
            'q': 'Compare "Authentication" vs. "Authorization"',
            'a': 'Authentication is the process of identifying an actor using given credentials.\nAuthorization is the process of checking what an identified actor is allowed to do and granting/preventing access to resources in accordance.'
         }, 
    '38': {
            'q': 'Compare encryption and hashing',
            'a': 'Encryption is a two-way function; what is encrypted can be decrypted with the proper key. Hashing, however, is a one-way function that scrambles plain text to produce a unique message digest. Hashes cannot be decrypted.'
        }, 
    
    '39': {
            'q': 'Examples of strong, slow hashing algorithms that generate hashes safe to store in a database',
            'a': 'Bcrypt, PBKDF2, Argon2'
         }, 
    '40': {
            'q': 'Express middleware library that helps you implement Cross-Site Resource Sharing?',
            'a': 'cors'
         }, 
    '41': {
            'q': 'Express middleware library that helps you use the bearer tokens from a request',
            'a': 'express-bearer-token'
         }, 
    '42': {
            'q': 'HTTP method for ADDING A NEW resource',
            'a': 'POST'
         }, 
    '43': {
            'q': 'HTTP method for REMOVING a resource',
            'a': 'DELETE'
         }, 
    '44': {
            'q': 'HTTP method for REMOVING a resource',
            'a': 'GET'
         }, 
    '45': {
            'q': 'HTTP method for UPDATING a resource',
            'a': 'PUT'
         }, 
    '46': {
            'q': 'JWT stands for ...',
            'a': 'JSON Web Token'
         }, 
    '47': {
            'q': 'ReST stands for ...',
            'a': 'Representational State Transfer'
         }, 
    '48': {
            'q': 'Some examples of "broken" hash functions',
            'a': 'md5, SHA1'
         }, 
    '49': {
            'q': 'Three sections of a JWT',
            'a': 'Header, Payload, Signature'
         }, 

    '50': {
            'q': 'Usage of a list of hashes for common passwords, combatted by the use of cryptographic salts',
            'a': 'Rainbow Table Attack'
         }, 
    '51': {
            'q': 'What is the purpose of a JWT\'s header?',
            'a': 'To set the type and signing algorithm of the JWT'
         }, 
    '52': {
            'q': 'What is the purpose of the JWT\'s signature?',
            'a': 'Verifies the origin of the JWT'
         }, 
    '53': {
            'q': 'Explain "Broken" hash functions',
            'a': 'hash functions that have been cracked. The original input to these functions can be determined by the hashed values produced.'
         }, 
    '54': {
            'q': 'Explain "Strong" hash functions',
            'a': 'hash functions that have not been cracked. Given a hashed value, we cannot (at this point) determine what the original input was without some brute force, trial and error calculations.'
         }, 
};

const regex = /robot/gi;
function extractQ(index) {
    const rando = Math.floor(Math.random() * 55);
    const question = idx[rando].q
    const answer = idx[rando].a
//     console.log(rando)
    return `QUESTION: ${question}\n\nANSWER: ||${answer}||`
};

client.on('ready', () => {
    console.log('Our bot is ready to go!!!')
})

client.on('message', msg => {
    
    if(msg.content === 'It\'s alive!') {
        msg.react('🤖')
    }
    
    if(msg.content === '!flash'){
        msg.channel.send(`${extractQ(idx)}`)
    }

    if(msg.content === '!flashfact') {
        fetch("https://uselessfacts.jsph.pl/random.json?language=en")
        .then(res => res.json())
        .then(json => {
            fact = json.text;
            msg.channel.send(`${fact}`)
        })
        .catch(err => console.log(err))
    }

    if(msg.content === 'Say hi, FlashBot!') {
        msg.channel.send(`Hello, fellow human.`)
    }

//     if(regex.test(msg.content)) {
//         msg.channel.send('I\'m not a robot, you\'re a robot!!!')
//     }
})

client.login(process.env.BOT_TOKEN)