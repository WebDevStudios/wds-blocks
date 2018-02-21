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
# @author Greg Rickaby, Kellen Mace
# @version 1.0.0
#
buildWordPressGutenberg() {
	# Switch to the /plugins/ directory
	cd ..

	# Does the WordPress Gutenberg plugin already exist?
	if [ -d "gutenberg" ]; then
		# Ask user if it can be removed.
		echo "I found the $(tput setaf 1)WordPress Gutenberg$(tput sgr0) plugin in $(tput setaf 1)plugins/gutenberg$(tput sgr0). I recommend installing a fresh copy. May I go ahead and do this for you? Answer [y/n] and press [ENTER] to continue..."
		read -r answer
		if [ "$answer" == "y" ];
		then
			echo "$(tput setaf 1)Removing the WordPress Gutenberg plugin... 🗑$(tput sgr0)"
			# Remove the exiting plugin.
			rm -rf gutenberg
			spinner
			echo "The WordPress Gutenberg plugin has been removed."
		else
			echo "OK $USER, I'll leave the WordPress Gutenberg plugin alone. 👌🏼"
			# Switch back to the wds-gutenberg directory and exit.
			# Don't proceed to cloning and building the WordPress Gutenberg plugin.
			cd ../wds-gutenberg
			return 0
		fi
	fi

	echo "$(tput setaf 1)Cloning the WordPress Gutenberg plugin... ⬇️$(tput sgr0)"
	git clone git@github.com:WordPress/gutenberg.git

	# Is the gutenberg directory mising?
	if [ ! -d "gutenberg" ]; then
		echo "$(tput setaf 1)⚠️ An error occurred while trying to clone the WordPress Gutenberg plugin. Please try cloning it manually.$(tput sgr0)"
		return 1
	fi

	cd gutenberg
	echo "$(tput setaf 1)Building the WordPress Gutenberg plugin... 🔨$(tput sgr0)"
	npm install
	npm run-script build

	echo "$(tput setaf 1)The WordPress Gutenberg plugin has been installed. 👊🏻$(tput sgr0)"

	# Switch back to the wds-gutenberg directory and exit.
	cd ../wds-gutenberg
	return 0
}

# Build wd_s.
#
# @author Greg Rickaby, Kellen Mace
# @version 1.0.0
#
buildwd_s() {
	# Switch to the /themes/ directory
	cd ../../themes

	# Does the wd_s theme already exist?
	if [ -d "wd_s" ]; then
		# Ask user if it can be removed.
		echo "I found the $(tput setaf 1)wd_s$(tput sgr0) theme in $(tput setaf 1)themes/wd_s$(tput sgr0). I recommend installing a fresh copy. May I go ahead and do this for you? Answer [y/n] and press [ENTER] to continue..."
		read -r answer
		if [ "$answer" == "y" ];
		then
			echo "$(tput setaf 1)Removing the wd_s theme...  🗑$(tput sgr0)"
			# Remove the existing theme.
			rm -rf wd_s
			spinner
			echo "The wd_s theme has been removed."
		else
			echo "OK $USER, I'll leave the wd_s theme alone. 👌🏼"
			# Switch back to the wds-gutenberg directory and exit.
			# Don't proceed to cloning and building the wd_s theme.
			cd ../plugins/wds-gutenberg
			return 0
		fi
	fi

	echo "$(tput setaf 1)Cloning the wd_s theme... ⬇️$(tput sgr0)"
	git clone -b feature/gutenberg git@github.com:WebDevStudios/wd_s.git

	# Is the wd_s directory mising?
	if [ ! -d "wd_s" ]; then
		echo "$(tput setaf 1)⚠️ An error occurred while trying to clone the wd_s theme. Please try cloning it manually.$(tput sgr0)"
		return 1
	fi

	cd wd_s
	echo "$(tput setaf 1)Building the wd_s theme... 🔨$(tput sgr0)"
	npm install
	bower install
	gulp

	echo "$(tput setaf 1)The wd_s theme has been installed. 👊🏻$(tput sgr0)"

	# Switch back to the wds-gutenberg directory and exit.
	cd ../plugins/wds-gutenberg
	return 0
}

# Build the WDS Gutenberg plugin.
#
# @author Greg Rickaby, Kellen Mace
# @version 1.0.0
#
buildWDSGutenberg() {
	echo "$(tput setaf 1)Building the WDS Gutenberg Plugin... 🔨$(tput sgr0)"
	npm install
	npm run-script build
	echo "$(tput setaf 1)The WDS Gutenberg plugin has been installed. 👊🏻$(tput sgr0)"
}

# -------------------------------------------------------- #
# Kick off the install script!
# -------------------------------------------------------- #
echo "Hello $USER! Let's install the WDS Gutenberg project... \n"

buildWordPressGutenberg
spinner
buildwd_s
spinner
buildWDSGutenberg
spinner

# Tell the user we're all done.
echo "🎸  All done! 🎸 \n"
echo "👉  Don't forget to install $(tput setaf 1)Advanced Custom Fields Pro$(tput sgr0) and do a $(tput setaf 1)MigrateDB Pro pull$(tput sgr0)!"
echo "👉  Also, check out the $(tput setaf 1)README.md$(tput sgr0) to get started building Gutenblocks. 🤟"
