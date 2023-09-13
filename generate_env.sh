#!/bin/bash

# Run the command and capture the output
output=$(npx supabase status)

# Extract values from the output
supabase_url=$(echo "$output" | grep "API URL:" | awk '{print $3}')
anon_key=$(echo "$output" | grep "anon key:" | awk '{print $3}')
db_host=$(echo "$output" | grep "DB URL:" | awk -F@ '{print $NF}' | awk -F: '{print $1}')
db_port=$(echo "$output" | grep "DB URL:" |awk -F: '{print $NF}' | awk -F/ '{print $1}')
db_name=$(echo "$output" | grep "DB URL:" | awk -F/ '{print $4}')
db_user=$(echo "$output" | grep "DB URL:" | awk -F[:/] '{print $5}')
db_pass=$(echo "$output" | grep "DB URL:" | awk -F[:@] '{print $4}')

# Generate the .env.test file
cat <<EOF > .env.test
NEXT_PUBLIC_SUPABASE_URL=$supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=$anon_key
DATABASE_HOST=$db_host
DATABASE_PORT=$db_port
DATABASE_NAME=$db_name
DATABASE_USER=$db_user
DATABASE_PASS=$db_pass
EOF

echo ".env.test file generated."
