#The configuration for the `remote` backend.
terraform {
    backend "remote" {
        # The name of your Terraform Cloud organization.
        organization = "Zodrow-LLC"

        # The name of the Terraform Cloud workspace to store Terraform state files in.
        workspaces {
            name = "FOF8-Web"
        }
    }

    required_providers {
        aws = {
            source  = "hashicorp/aws"
            version = "~> 3.27"
        }
    }

    required_version = ">= 0.14.9"
}

provider "aws" {
    region  = "us-west-2"
    access_key = "{{ env.AWS_ACCESS_KEY_ID }}"
    secret_key = "{{ env.AWS_SECRET_ACCESS_KEY }}"
}

resource "aws_instance" "fof8-app" {
    ami           = "ami-830c94e3"
    instance_type = "t2.micro"

    tags = {
        Name = "FOF8AppServerInstance"
    }
}