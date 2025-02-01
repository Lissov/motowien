# Install VSCode
`sudo apt install code`
Run and install python extension

# Clone motowien
`git clone https://github.com/Lissov/motowien.git`

# Install service and start
`cd /lib/systemd/system`
`sudo nano motowien.service`
Copy contents of motowien.service. Check that directory is correct - depending on where was git cloned.
`sudo systemctl enable motowien.service`
`sudo systemctl start motowien.service`
