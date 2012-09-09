mojito-redis-app


simple mojito app to talk with redis no sql database

Steps:
======

        first setup the redis server using instructuon here: http://redis.io/topics/quickstart
        download http://download.redis.io/redis-stable.tar.gz
        tar xvzf redis-stable.tar.gz
        cd redis-stable
        make

        cd src
        sudo cp redis-server /usr/local/bin/
        sudo cp redis-cli /usr/local/bin/

        now you can run your redis server on localhost as 
        `redis-server`

        OR

        $ git clone http://github.com/antirez/redis.git
        $ cd redis/src
        $ make
        $ sudo make install
        $ cd ../..
        $ rm -rf redis
                

        -: To add extra external npm packages make sure you do npm install packganame -g or do cd ./node_modules/pkgname/ && npm link