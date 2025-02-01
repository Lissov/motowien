import os
import subprocess
import time

# Set the path to the local repository
repo_path = "/home/pi/dev/motowien"  # Change this to your repository path
build_script = os.path.join(repo_path, "/sources/build/build.js")

def check_for_updates(repo_path):
    """Checks if there are new updates in the remote repository."""
    if not os.path.isdir(repo_path):
        print(f"Error: The directory '{repo_path}' does not exist. Please clone the repository first.")
        return False

    try:
        # Fetch latest info without modifying local files
        subprocess.run(["git", "-C", repo_path, "fetch"], check=True, capture_output=True, text=True)

        # Check if local branch is behind the remote
        result = subprocess.run(
            ["git", "-C", repo_path, "status", "-uno"], capture_output=True, text=True, check=True
        )

        if "Your branch is up to date" in result.stdout:
            print("✔ No updates available.")
            return False
        else:
            print("🚀 Updates found! Pulling latest changes...")
            return True
    except subprocess.CalledProcessError as e:
        print(f"Error checking for updates:\n{e.stderr}")
        return False

def pull_latest_changes(repo_path):
    """Pulls the latest changes if updates are available."""
    if check_for_updates(repo_path):
        try:
            result = subprocess.run(["git", "-C", repo_path, "pull"], capture_output=True, text=True, check=True)
            print(result.stdout)
        except subprocess.CalledProcessError as e:
            print(f"Error pulling from GitHub:\n{e.stderr}")

import os
import subprocess

def commit_and_push(repo_path, commit_message="Updated files"):
    """Commits all changes and pushes to the remote repository."""
    if not os.path.isdir(repo_path):
        print(f"Error: The directory '{repo_path}' does not exist.")
        return False

    try:
        # Add all changes
        subprocess.run(["git", "-C", repo_path, "add", "."], check=True, capture_output=True, text=True)

        # Commit changes
        commit_result = subprocess.run(
            ["git", "-C", repo_path, "commit", "-m", commit_message],
            capture_output=True, text=True, check=False
        )

        # Check if commit was successful (or nothing to commit)
        if "nothing to commit" in commit_result.stdout.lower():
            print("✔ No changes to commit.")
            return False

        print(commit_result.stdout)

        # Push changes
        push_result = subprocess.run(["git", "-C", repo_path, "push"], capture_output=True, text=True, check=True)
        print(push_result.stdout)

        print("🚀 Changes pushed successfully!")
        return True

    except subprocess.CalledProcessError as e:
        print(f"❌ Error during git operation:\n{e.stderr}")
        return False

def run_build_script(build_script):
    if os.path.isfile(build_script):
        try:
            result = subprocess.run(["node", build_script], capture_output=True, text=True, check=True)
            print(result.stdout)
            print("✔ Build completed successfully!")
        except subprocess.CalledProcessError as e:
            print(f"❌ Error running build script:\n{e.stderr}")
    else:
        print(f"Error: build.js not found at {build_script}")



while True:
    if pull_latest_changes(repo_path):
        run_build_script(build_script)
        commit_and_push("Build for deployment")
    time.sleep(60)