variable "region" {
  type    = string
  default = "us-west-1"
}

variable "aws_profile" {
    type    = string
    default = "jwhance"
}

variable "s3_name" {
  type    = string
  default = "cf-s3-bucket-jwhance"
}

variable "cf_domain " {
  type = string
  default = "jwhance.com"
}

variable "route53_zone_id" {
  type = string
  default = "Z2BQXLFMAN56WN"
}