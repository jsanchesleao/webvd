# WebVD

A stream video downloader that crawls the web

## Installation
`npm install webvd -g`

## Usage

`webvd -c configfile -t tags [-d targetDir] [-p filePrefix] [--unsafe]`

The config file should be ccrawler [crawl file](https://github.com/jsanchesleao/ccrawler) that returns the url of the video resource.

The tags parameter is an identifier to be used in the crawling process, and it can be a number or a range, in which case the crawler will run once for each item in the tags list:

```bash
#this will run the crawler five times, iterating through the tag
webvd -c mycrawl -t 1-5
```

If there are any https links with unverified certificates, you can disable the check by passing the `--unsafe` flag.

## Using a shared crawler

Crawler files can be shared by saving them in the [dontpad](http://dontpad.com) service. If you have a crawler saved, say, in the http://dontpad.com/my-crawler url, simply run `webvd -c @my-crawler -t 1` to download it with `tag 1`.
