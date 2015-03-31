# TrialSource

## Information

To run TrialSource, simply type within the root of the TrialSource directory:

    $ vagrant up

Configuration is handled within the `Vagrantfile` which points to our Ansible playbook

Contact appointed security officer for Ansible password


## The Health Insurance Portability and Accountability Act (HIPAA) compliance

Outlined below are the basic standards and practices followed by this app for HIPAA compliance.

For a good overview of what HIPAA exactly compliance means:
http://luxsci.com/blog/what-makes-a-web-site-hipaa-secure.html


### Policy


#### Application Level

- All TrialSource access is to be logged
- Audit all changes including who, when, and what
- Database snapshots/backups and geographic redundancy are coordinated by Security Officer
- PHI must not be sent directly through email. Any sharing of data must require website signup and login
- All application access is SSL-secured
- All static file storage is encrypted
- Error messages are stripped of all params
- Transactional emails do not contain PHI



#### Server Level

- Developers must submit individual public SSH keys for SSH login. Shared keys must not be used.
- The appointed security officer must not download raw dump of production database unless actually necessary. If a production database snapshot must be downloaded, it must only be stored on encrypted volumes. 
- Developers should write application code and keep direct sever maintenance as minimal as possible.
- Security officer logs all SSH access


#### General Development Policy & Risk Management

- Developers must not use root AWS credentials for AWS login. All AWS access must be done through IAM users
- Any laptops configured to deploy code should require password on startup or to wake from sleep.
- Ensure that the security officer is constantly auditing, logging, monitoring, backup, disaster recovery, encryption (in-transit and atrest), IDS, file integrity logging, and vulnerability scanning.
- Coordinate with Catalyze.io for further help

#### Access to the AWS server

To access your instance:

    1. Open an SSH client.
    2. Locate your private key file given to you by the security officer (iam_pem_file.pem).
       The wizard automatically detects the key you used to launch the instance.
       Your key must not be publicly viewable for SSH to work. Use this command if needed:

        $ chmod 400 iam_pem_file.pem

    3. Connect to your instance using its Public IP: 52.1.128.141

Example:

        $ ssh -i iam_pem_file.pem ec2-user@52.1.128.141




