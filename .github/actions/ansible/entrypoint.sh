#!/bin/sh

echo "Ansible Entrypoint"
echo "This is the secret: $SSH_PASSWORD"

echo "ansible_ssh_pass=$SSH_PASSWORD" >> /hosts.ini
echo "ansible_become_pass=$SSH_PASSWORD" >> /hosts.ini

ansible-playbook ansible/playbook.yml --user akshath
