require('dotenv').config();
const fetch = require('node-fetch');

const Discord = require('discord.js');
const client = new Discord.Client({
    partials: ["MESSAGE"]
});




const idx = {
    '0': {
            'q': 'Describe the use of "SERIAL".',
            'a': 'Auto-incrementing. Very useful for IDs.'
         },

    '1': {
            'q': 'Describe the use of "VARCHAR(n)"',
            'a': 'A string with a character limit of "n".'
         },

    '2': {
            'q': 'Describe the use of "TEXT".',
            'a': 'Does not have a character limit like VARCHAR, but it is less performant.'
         },

    '3': {
            'q': 'Describe the use of "BOOLEAN".',
            'a': 'true/false inputs.'
         },

    '4': {
            'q': 'Describe the use of "SMALLINT".',
            'a': 'Signed two-byte integer.\n (-32768 to 32767)' 
         },

    '5': {
            'q': 'Describe the use of "INTEGER".',
            'a': 'Signed four-byte integer. (standard)'
         },

    '6': {
            'q': 'Describe the use of "BIGINT".',
            'a': 'Signed eight-byte integer. (very large numbers)'
         },

    '7': {
            'q': 'Define the use of "NUMERIC" or "DECIMAL".',
            'a': 'Can store exact decimal values.'
         },

    '8': {
            'q': 'Describe the use of "TIMESTAMP".',
            'a': 'This is used for date and time.'
         },

    '9': {
            'q': 'What is the purpose of "UNIQUE" constraint?',
            'a': 'Indicates that the data for the column must not be repeated.'
         },

    '10': {
            'q': 'What is the purpose of the "NOT NULL" constraint?',
            'a': 'Indicates that there needs to be an input in that field.'
         },

    '11': {
            'q': 'What does RDBMS stand for?',
            'a': '"A stand-alone entity that is meaningful on its own." Typically this means a group of elements that form some sort of unit/feature together, but could also be applied to a single element if it has enough significance and stand-alone meaning.'
         },
    '12': {
            'q': 'What\'s one way to define a foreign key when creating a table in SQL?',
            'a': 'user_id INTEGER REFERENCES users(id)'
         },
    '13': {
            'q': 'What SQL statement will successfully create a \'users\' table with appropriate constraints?\n\nA. CREATE TABLE users(id SERIAL PRIMARY KEY,username VARCHAR(50) NULL FALSE,email VARCHAR(100) NULL FALSE);\n\nOR\n\nB. CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(50) NOT NULL, email VARCHAR(100) NOT NULL );',
            'a': 'B. CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(50) NOT NULL, email VARCHAR(100) NOT NULL );'
         },
    '14': {
            'q': 'Which of these is NOT a valid SQL data type?\n\nA. INTEGER\nB. VARCHAR\nC. STRING\nD. TEXT',
            'a': 'C. STRING'
         },
    '15': {
            'q': 'What will this do?\nDELETE FROM friends;',
            'a': 'Delete all rows from the "friends" table.'
         },
    '16': {
            'q': 'What SQL keyword is used to sort the result-set?',
            'a': 'ORDER BY'
         },
    '17': {
            'q': 'How can you return the number of records in the "persons" table',
            'a': 'SELECT COUNT(*) FROM persons;'
         },
    '18': {
            'q': 'Which of these is NOT a valid SQL operator?\n\nA. IN\nB. LIKE\nC. MATCHES\nD. BETWEEN',
            'a': 'C. MATCHES'
         },
    '19': {
            'q': 'Will the below successfully insert data?\n\n INSERT INTO friends(id, first_name, last_name) VALUES ("Rose", "Tyler") ("Martha", "Jones");',
            'a': 'No. Missing arguments for "id".'
         },
    '20': {
            'q': 'When you log into ```psql```, how do you know that the user is a "SUPERUSER"?',
            'a': 'The prompt shows "=#" after the database name'
         },
    '21': {
            'q': 'When you log into ```psql```, how do you know the user is a "NORMAL USER"?',
            'a': 'The prompt shows "=>" after the database name.'
         },
    '22': {
            'q': 'How do you create a database with a specific user?\nEx. Database name: People\nUser: person_app',
            'a': 'CREATE DATABASE People WITH OWNER person_app;'
         },
    '23': {
            'q': 'How do you remove connection privileges to a database from the public?',
            'a': 'REVOKE CONNECT ON DATABASE {db_name} FROM PUBLIC;\n\nThis removes all public connection access.'
         },
    '24': {
            'q': 'How do we grant a specific user a connection back to a database?',
            'a': 'GRANT CONNECT ON DATABASE {db_name} FROM {specific user, PUBLIC, etc.};'
         },
    '25': {
            'q': 'How do we initialize a new Sequelize project?',
            'a': 'npx sequelize init\n\nOR\n\nnpx sequelixe-cli init'
         },
    '26': {
            'q': 'What is the correct way to define belongsTo association on a model?',
            'a': 'Post.belongsTo(models.User, {foreignKey: "userId"});'
         },
    '27': {
            'q': 'How would we query for a user with an id of 5?',
            'a': 'User.findByPk(5);'
         },
    '28': {
            'q': 'What method do we use in Sequelize seed files to add multiple records to our database?',
            'a': 'bulkInsert'
         },
    '29': {
            'q': 'How would you add a new user to the database with the username "Mitchell"?',
            'a': 'User.create( { username: "Mitchell" } )'
         },
    '30': {
            'q': 'What Sequelize method is used to delete a record from our database?',
            'a': 'post.destroy()'
         }, 
    '31': {
            'q': 'Define what a RDBMS is.',
            'a': 'A software application that you run that connects to your programs, allowing you to store, modify, and retrieve data. '
         }, 
    '32': {
            'q': 'Describe relational data.',
            'a': 'In general, relational data is information that is connected to other pieces of information. When working with relational databases, we can connect two entries together utilizing foreign keys.'
         }, 
    '33': {
            'q': 'Define a database.',
            'a': 'The actual location that data is stored. A database can be made up of many tables that each store specific kinds of information.'
         }, 
    '34': {
            'q': 'Define a database table.',
            'a': 'Within a database, a table stores one specific kind of information. The records (entries) on these tables can be connected to records on other tables through the use of foreign keys.'
         }, 
    '35': {
            'q': 'Describe the purpose of a primary key.',
            'a': 'A primary key is used in the database as a unique identifier for the table. We often use an "id" field that simply increments with each entry. The incrementing ensures that each record has a unique identifier, even if their are other fields of the record that are repeated (two people with the same name would still need to have a unique identifier, for example). With a unique identifier, we can easily connect records within the table to records from other tables.'
         }, 
    '36': {
            'q': 'Describe the purpose of a foreign key.',
            'a': 'A foreign key is used as the connector from this record to the primary key of another table\'s record.'
         }, 
    '37': {
            'q': 'Describe how to properly name things in PostgreSQL.',
            'a': 'Names within postgres should generally consist of only lowercase letters, numbers, and underscores. Tables within a database are plural by convention, so a table for cats would typically be "cats" and office locations would be "office_locations" (all lowercase, underscores to replace spaces, plural)'
         }, 
    '38': {
            'q': 'When working on the command line how do you sign in to a database other than the default?',
            'a': 'By providing the ```psql``` command with an argument\n\n```psql <database>```\n\nIf already logged in as default:\n\n```\\c <database>```'
         }, 
};

const regex = /robot/gi;
function extractQ(index) {
    const rando = Math.floor(Math.random() * 39);
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