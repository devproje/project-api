#!/bin/bash
MODULE=github.com/devproje/project-api@$1
PROXY_URL=proxy.golang.org

if [ $1 == "default" ]; then
    echo "Please type spectified tags"
else
    git tag $1
	git push origin $1
	GOPROXY=$PROXY_URL go list -m $MODULE
fi