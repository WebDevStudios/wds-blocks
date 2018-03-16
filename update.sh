#!/usr/bin/env bash

# -------------------------------------------------------- #
# Install functions
# -------------------------------------------------------- #

# Simple spinner.
#
# @author Greg Rickaby
# @version 1.0.0
#
spinner() {
	printf "\\b/"
	sleep 0.2
	printf "\\b-"
	sleep 0.2
	printf "\\b\\"
	sleep 0.2
	printf "\\b|"
	sleep 0.2
	printf "\\b\\b \\n"
}

# Update the WordPress Gutenberg plugin.
#
# @author Greg Rickaby
# @version 1.0.0
#
updateWordPressGutenberg() {
	# Switch to the /plugins/ directory
	cd ..

	# Does the WordPress Gutenberg plugin already exist?
	if [ -d "gutenberg" ]; then
		cd gutenberg
		git checkout master
		git pull
		echo "$(tput setaf 1)I've pulled down the lastest code from WordPress Gutenberg's master branch ⬇️$(tput sgr0)"
	fi

	# Switch back to the wds-gutenberg directory and exit.
	cd ../wds-gutenberg
	return 0
}

# Update wd_s.
#
# @author Greg Rickaby
# @version 1.0.0
#
updatewd_s() {
	# Switch to the /themes/ directory
	cd ../../themes

	# Make sure wd_s exists...
	if [ -d "wd_s" ]; then
		cd wd_s
		git checkout feature/gutenberg
		git pull
		echo "$(tput setaf 1)I've pulled down the latest from wd_s feature/gutenberg branch ⬇️$(tput sgr0)"
	fi

	# Switch back to the wds-gutenberg directory and exit.
	cd ../../plugins/wds-gutenberg
	return 0
}

# Update the WDS Gutenberg plugin.
#
# @author Greg Rickaby
# @version 1.0.0
#
updateWDSGutenberg() {
	git checkout master
	git pull
	echo "$(tput setaf 1)I've pulled down the latest from WDS Gutenberg's master branch ⬇️$(tput sgr0)"
}

# -------------------------------------------------------- #
# Kick off the update script!
# -------------------------------------------------------- #
echo "Hello $USER! Let's update the WDS Gutenberg project... \n"

updateWordPressGutenberg
spinner
updatewd_s
spinner
updateWDSGutenberg
spinner

# Tell the user we're all done.
echo "🎸  All done! 🎸 \n"
