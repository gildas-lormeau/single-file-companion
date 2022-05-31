#!/bin/sh
mkdir -p ~/.config/google-chrome/NativeMessagingHosts/
jq '.path= "'$PWD'/single-file-companion.sh"' singlefile_companion.json > ~/.config/google-chrome/NativeMessagingHosts/singlefile_companion.json