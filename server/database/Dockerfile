FROM mysql:8.0

ENV MYSQL_DATABASE=notes
    MYSQL_USER=root
    MYSQL_PASSWORD=Gaurik15#

# Copy custom SQL scripts to initialize the database
COPY ./notes.sql /docker-entrypoint-initdb.d/

# Expose port 3306 to the host
EXPOSE 3306
