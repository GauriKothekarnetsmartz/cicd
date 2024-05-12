FROM mysql:8.0.3

ENV MYSQL_DATABASE=notes
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_PASSWORD=Gaurik15#

# Copy custom SQL scripts to initialize the database
COPY ./notes.sql /docker-entrypoint-initdb.d/

# Expose port 3306 to the host
EXPOSE 3306

# Set up master configuration
RUN { \
    echo '[mysqld]'; \
    echo 'log-bin=mysql-bin'; \
    echo 'server-id=1'; \
    echo 'binlog-format=row'; \
    } > /etc/mysql/conf.d/mysql.cnf
