# =====================================================
# Stage 1
# =====================================================

FROM node:22-alpine

# App Directory
WORKDIR /app

# Copy Package Files
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy Source
COPY . .

# Expose Port
EXPOSE 5000

# Start Server
CMD ["npm", "start"]