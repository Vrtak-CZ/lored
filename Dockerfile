FROM oven/bun:1
WORKDIR /app

# Copy source files only (no dependencies needed)
COPY index.ts parser.ts ./

# Set environment and run
ENV PORT=3000
EXPOSE 3000
CMD ["bun", "run", "index.ts"]
