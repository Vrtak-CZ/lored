FROM oven/bun:1
WORKDIR /app

# Copy source files only (no dependencies needed)
COPY index.ts parser.ts ./

# Set environment and run
ENV PORT=8080
EXPOSE 8080
CMD ["bun", "run", "index.ts"]
