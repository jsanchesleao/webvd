# WebVD

A stream video downloader that crawls the web

## Installation
`npm install webdv -g`

## Usage

`webvd -c configfile -t tags [-d targetDir] [-p filePrefix] [--unsafe]`

The config file should be ccrawler [crawl file](https://github.com/jsanchesleao/ccrawler) that returns the url of the video resource.

The tags parameter is an identifier to be used in the crawling process, and it can be a number or a range, in which case the crawler will run once for each item in the tags list:

```bash
#this will run the crawler five times, iterating through the tag
webvd -c mycrawl -t 1-5
```

If there are any https links with unverified certificates, you can disable the check by passing the `--unsafe` flag.
