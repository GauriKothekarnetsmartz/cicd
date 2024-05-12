FROM mysql:8.0.3
 
ENV MYSQL_DATABASE=notes
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_PASSWORD=Gaurik15#
 
# Copy custom SQL scripts to initialize the database
COPY ./notes.sql /docker-entrypoint-initdb.d/
 
# Expose port 3306 to the host
EXPOSE 3306
 
# Set up slave configuration
RUN { \
    echo '[mysqld]'; \
    echo 'server-id=2'; \
    echo 'relay-log=mysql-relay-bin'; \
    echo 'log-bin=mysql-bin'; \
    echo 'binlog-format=row'; \
    echo 'relay-log-index=mysql-relay-bin.index'; \
    echo 'replicate-ignore-db=mysql'; \
    echo 'replicate-ignore-table=mysql.user'; \
    echo 'replicate-ignore-table=mysql.db'; \
    } > /etc/mysql/conf.d/mysql.cnf
