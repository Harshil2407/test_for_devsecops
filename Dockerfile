# SECURE: Using a specific, minimal base image tag
FROM python:3.11-slim-bullseye

# SECURE: Creating a non-root user to run the application
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

WORKDIR /app

# SECURE: Proper package management without caching unnecessary files
RUN apt-get update && \
    apt-get install -y --no-install-recommends sqlite3 && \
    rm -rf /var/lib/apt/lists/*

COPY main.py /app/

# SECURE: Setting appropriate file ownership
RUN chown -R appuser:appgroup /app

# SECURE: Switching to the non-root user before executing the application
USER appuser

CMD ["python", "main.py"]
