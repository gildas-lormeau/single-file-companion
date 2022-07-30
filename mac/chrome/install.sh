#!/bin/sh
mkdir -p ~/Library/Application\ Support/Google/Chrome/NativeMessagingHosts/
jq '.path= "'$PWD'/single-file-companion.sh"' singlefile_companion.json > ~/Library/Application\ Support/Google/Chrome/NativeMessagingHosts/singlefile_companion.json