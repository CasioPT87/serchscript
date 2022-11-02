# cucarachas

First run docker containers

Then go to mongosh cli

type `use admin`

then type `db.auth(‘username’,’password’)` -which are at the docker-compose yaml file-

then `use cucarachas`

and finally we create the user with its permissions:

`db.createUser({ user:'jamon',pwd:'pass', roles:[{role:'readWrite',db:'cucarachas'}]})`
