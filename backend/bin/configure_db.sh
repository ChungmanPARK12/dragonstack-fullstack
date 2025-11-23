#!/bin/bash

echo "Configuring"

DB_NAME=dragonstackdb
DB_USER=node_user
DB_HOST=127.0.0.1
DB_PASS=node_password

export PGPASSWORD="$DB_PASS"

# DB 삭제 (있으면만)
dropdb  -h "$DB_HOST" -U "$DB_USER" --if-exists "$DB_NAME"
# 새로 생성
createdb -h "$DB_HOST" -U "$DB_USER" "$DB_NAME"

# 스키마 로드
psql -h "$DB_HOST" -U "$DB_USER" "$DB_NAME" < ./bin/sql/generation.sql
psql -h "$DB_HOST" -U "$DB_USER" "$DB_NAME" < ./bin/sql/dragon.sql
psql -h "$DB_HOST" -U "$DB_USER" "$DB_NAME" < ./bin/sql/trait.sql
psql -h "$DB_HOST" -U "$DB_USER" "$DB_NAME" < ./bin/sql/dragonTrait.sql

# trait 데이터 삽입
node ./bin/insertTraits.js

echo "Configured"



# echo "Configuring"

# dropdb -U node_user dragonstackdb
# createdb -U node_user dragonstackdb

# psql -U node_user dragonstackdb < ./bin/sql/generation.sql
# psql -U node_user dragonstackdb < ./bin/sql/dragon.sql
# psql -U node_user dragonstackdb < ./bin/sql/trait.sql

# node ./bin/insertTraits.js

# echo "Configured"