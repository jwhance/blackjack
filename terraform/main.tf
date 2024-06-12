provider "aws" {
  region                  = var.region
  profile                 = var.aws_profile
}


# Create an S3 bucket to host the website content
resource "aws_s3_bucket" "website_bucket" {
  bucket = "cf-static-site-jwh"
  acl    = "private"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

# Create a CloudFront origin access identity
resource "aws_cloudfront_origin_access_identity" "website_oai" {
  comment = "Origin Access Identity for website"
}

# Grant CloudFront access to the S3 bucket
data "aws_iam_policy_document" "s3_bucket_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.website_bucket.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.website_oai.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "website_bucket_policy" {
  bucket = aws_s3_bucket.website_bucket.id
  policy = data.aws_iam_policy_document.s3_bucket_policy.json
}

# Create a CloudFront distribution to serve the website
resource "aws_cloudfront_distribution" "website_distribution" {
  origin {
    domain_name = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_id   = "website-origin"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.website_oai.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  # aliases = ["blackjack.jwhance.com"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "website-origin"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 300
    max_ttl                = 1200
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# Output the CloudFront distribution domain name
output "website_url" {
  value = aws_cloudfront_distribution.website_distribution.domain_name
}

