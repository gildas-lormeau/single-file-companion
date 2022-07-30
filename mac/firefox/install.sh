#!/bin/sh
mkdir -p ~/Library/Application\ Support/Mozilla/NativeMessagingHosts/
jq '.path= "'$PWD'/single-file-companion.sh"' singlefile_companion.json > ~/Library/Application\ Support/Mozilla/NativeMessagingHosts/singlefile_companion.json