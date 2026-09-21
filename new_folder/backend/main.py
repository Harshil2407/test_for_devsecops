import sqlite3
import subprocess
import os

# SECURE: Loading secrets from environment variables (No hardcoded credentials)
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

def get_user(username):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    # SECURE: Using parameterized queries to prevent SQL Injection
    query = "SELECT * FROM users WHERE username = ?"
    cursor.execute(query, (username,))
    return cursor.fetchall()

def ping_server(ip_address):
    # SECURE: Using subprocess.run with a list of arguments and shell=False to prevent Command Injection
    try:
        # Note: Validate IP format in a real app before executing ping
        subprocess.run(["ping", "-c", "4", ip_address], check=True, shell=False)
    except subprocess.CalledProcessError as e:
        print(f"Ping failed: {e}")

if __name__ == "__main__":
    user = input("Enter username: ")
    print(get_user(user))
    
    ip = input("Enter IP to ping: ")
    ping_server(ip)
