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

# Build the WordPress Gutenberg plugin.
#
# @author Greg Rickaby
# @version 1.0.0
#
buildWordPressGutenberg() {
	echo "$(tput setaf 1)Removing the WordPress Gutenberg plugin...$(tput sgr0)"
	rm -rvf ../gutenberg
	echo "$(tput setaf 1)Cloning the WordPress Gutenberg plugin...$(tput sgr0)"
	git clone git@github.com:WordPress/gutenberg.git
	cd gutenberg || return
	echo "$(tput setaf 1)Building the WordPress Gutenberg plugin...$(tput sgr0)"
	npm install
	npm run-script build
	cd ..
	mv gutenberg/ ../
	echo "$(tput setaf 1)The WordPress Gutenberg plugin has been installed. 👊🏻$(tput sgr0)"
	spinner
}

# Build wd_s.
#
# @author Greg Rickaby
# @version 1.0.0
#
buildwd_s() {
	echo "$(tput setaf 1)Removing the wd_s theme...$(tput sgr0)"
	rm -rvf ../../themes/wd_s
	echo "$(tput setaf 1)Cloning the wd_s theme...$(tput sgr0)"
	git clone -b feature/gutenberg git@github.com:WebDevStudios/wd_s.git
	cd wd_s || return
	echo "$(tput setaf 1)Building the wd_s theme...$(tput sgr0)"
	npm install
	bower install
	gulp
	cd ..
	mv wd_s/ ../../themes/
	echo "$(tput setaf 1)The wd_s theme has been installed. 👊🏻$(tput sgr0)"
	spinner
}

# Build the WDS Gutenberg plugin.
#
# @author Greg Rickaby
# @version 1.0.0
#
buildWDSGutenberg() {
	echo "$(tput setaf 1)Building the WDS Gutenberg Plugin...$(tput sgr0)"
	npm install
	npm run-script build
	echo "$(tput setaf 1)The WDS Gutenberg plugin has been installed. 👊🏻$(tput sgr0)"
	spinner
}

# -------------------------------------------------------- #
# Kick off the install script!
# -------------------------------------------------------- #
echo "Hello $USER! Let's install the WDS Gutenberg project..."
spinner

# Removed existing cloned repos in the
# wds-gutenberg directory, so I can
# build from scratch.
if [ -d "gutenberg" ]; then
	rm -rvf gutenberg
fi

if [ -d "wd_s" ]; then
	rm -rvf wd_s
fi

# Whoa! I found the WordPress Gutenberg plugin.
# What should I do?
if [ -d "../gutenberg" ]; then

	echo "I found the $(tput setaf 1)WordPress Gutenberg$(tput sgr0) plugin in $(tput setaf 1)plugins/gutenberg$(tput sgr0). I recommend installing a fresh copy. May I go ahead and do this for you? Answer [y/n] and press [ENTER] to continue..."
	read -r answer
	if [ "$answer" == "y" ];
	then
		buildWordPressGutenberg
	else
		echo "OK $USER, I'll leave the WordPress Gutenberg plugin alone."
		spinner
	fi
fi

# Whoa! I found the WordPress Gutenberg plugin.
# What should I do?
if [ -d "../../themes/wd_s" ]; then
	echo "I found the $(tput setaf 1)wd_s$(tput sgr0) theme in $(tput setaf 1)themes/wd_s$(tput sgr0). I recommend installing a fresh copy. May I go ahead and do this for you? Answer [y/n] and press [ENTER] to continue..."
	read -r answer
	if [ "$answer" == "y" ];
	then
		buildwd_s
	else
		echo "OK $USER, I'll leave the wd_s theme alone."
		spinner
	fi
fi

# No WordPress Gutenberg plugin?
# Build it!
if [ ! -d "../gutenberg" ]; then
	buildWordPressGutenberg
fi

# No wd_s theme?
# Build it!
if [ ! -d "../../themes/wd_s" ]; then
	buildwd_s
fi

# Finally, build WDS Gutenberg plugin.
buildWDSGutenberg

# -------------------------------------------------------- #
# Kick off the install script!
# -------------------------------------------------------- #
echo "I'm finished $USER."
spinner
echo "Don't forget to install $(tput setaf 1)Advanced Custom Fields Pro$(tput sgr0) and do a $(tput setaf 1)MigrateDB Pro pull$(tput sgr0)!"
spinner
echo "Also, check out the $(tput setaf 1)README.MD$(tput sgr0) to get started building Gutenblocks. 🤟🏻"
