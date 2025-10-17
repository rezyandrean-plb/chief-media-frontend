#!/bin/bash

# Create .env file with database configuration
cat > .env << EOF
# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=kw-1.cspkrkicfu7p.ap-southeast-1.rds.amazonaws.com
DATABASE_PORT=5432
DATABASE_NAME=kwsg-gigeconomy
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=kwpostgres
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false

# Prisma
DATABASE_URL="postgresql://postgres:kwpostgres@kw-1.cspkrkicfu7p.ap-southeast-1.rds.amazonaws.com:5432/kwsg-gigeconomy?sslmode=require"

# Auth & Email
JWT_SECRET="change_me_super_secret_jwt_key"
SENDGRID_API_KEY=""
FROM_EMAIL="hello@kwsingapore.com"
EOF

echo "Environment file created successfully!"
echo "You can now run: bunx prisma db push"
