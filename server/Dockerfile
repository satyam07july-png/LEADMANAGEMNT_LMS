# =====================================================
# Stage 1
# =====================================================

FROM node:22-alpine

# Working Directory

WORKDIR /app

# Copy Package Files

COPY package*.json ./

# Install Dependencies

RUN npm install

# Copy Project

COPY . .

# Expose Port

EXPOSE 5000

# Start Server

CMD ["npm", "run", "dev"]