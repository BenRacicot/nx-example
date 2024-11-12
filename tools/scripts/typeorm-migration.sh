#!/bin/bash

# Check if at least one argument is provided
if [ $# -lt 1 ]; then
  echo "Usage: $0 [master|generate|create|run|revert] [name]"
  exit 1
fi

# Assign first argument to command variable
COMMAND=$1
TYPEORM="ts-node --project typeorm.tsconfig.json -r tsconfig-paths/register ./node_modules/typeorm/cli.js"
DELETE="del ./apps/server/src/app/database/migrations/*"
RM="rm ./apps/server/src/app/database/migrations/*"
SEED="ts-node --project typeorm.tsconfig.json -r tsconfig-paths/register ./node_modules/typeorm-extension/bin/cli.cjs"


# Handle different commands
case $COMMAND in
create)
  # Check if second argument is provided
  if [ $# -lt 2 ]; then
    echo "Please provide a [name]: $0 create [name]"
    exit 1
  fi
  # Assign second argument to name variable
  NAME=$2

  # Create a migration
  $TYPEORM migration:create ./apps/server/src/app/database/migrations/$NAME
  ;;

generate)
  # Check if second argument is provided
  if [ $# -lt 2 ]; then
    echo "Please provide a [name]: $0 generate [name]"
    exit 1
  fi
  # Assign second argument to name variable
  NAME=$2

  # Generate migrations
  $TYPEORM migration:generate ./apps/server/src/app/database/migrations/$NAME -d apps/server/src/app/database/typeorm.config.ts
  ;;

run)
  # Run migrations
  $TYPEORM migration:run -d apps/server/src/app/database/typeorm.config.ts
  ;;

revert)
  # Run migrations
  $TYPEORM migration:revert -d apps/server/src/app/database/typeorm.config.ts
  ;;

master)

  # Delete all tables
  $TYPEORM schema:drop -d apps/server/src/app/database/typeorm.config.ts
  # Delete all migration files
  $DELETE
  $RM
  # Assign second argument to name variable
  NAME="init"
  # Generate migrations
  $TYPEORM migration:generate ./apps/server/src/app/database/migrations/$NAME -d apps/server/src/app/database/typeorm.config.ts

  # Run migrations
  $TYPEORM migration:run -d apps/server/src/app/database/typeorm.config.ts

  # Run seed
  $SEED seed:run -d apps/server/src/app/database/typeorm.config.ts
  ;;
*)
  # Invalid command
  echo "Invalid command. Usage: $0 [master|generate|create|run|revert] [name]"
  exit 1
  ;;
esac
