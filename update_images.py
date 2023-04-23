#!/usr/bin/env python3

# The packages needed for running this file are stored under "requirements.txt"
# Run 'pip install -r requirements.txt' from this repository's folder to install the dependendecies.

import os
import re
import shutil
import time
from typing import Dict, List

from PIL import Image, ImageFilter
from tqdm import tqdm

IMAGE_FILE_EXTENSIONS = [ "png", "jpg", "jpeg", "gif" ]
PICTURES_PAGE_IMAGES_DIR = "src/assets/pictures-page-images/"
PICTURES_PAGE_IMAGES_TYPESCRIPT_FILE = "src/app/settings/pictures-page-images.ts"

class ImageInfo:
	def __init__(self, file_path: str, description: str = "", tags = []) -> None:
		self.file_path = file_path
		self.description = description
		self.tags = tags

	def __str__(self) -> str:
		return "ImageInfo:{ file_path: '" + self.file_path + "', description: '" + self.description + "', tags: ['" + "', '".join(self.tags) + "'] }"

	def to_typescript_string(self) -> str:
		tags_str = ""
		for tag in self.tags:
			tags_str += '"' + tag + '", '
		if len(tags_str) > 0:
			# Remove the extra comma and space if we have just one tag
			tags_str = tags_str[0:-2]
		return """  new ImageInfo(
    /* File path   */ "{file_path}",
    /* Description */ "{description}",
    /* Tags        */ [{tags}],
  ),
""".format(file_path=self.file_path, description=self.description, tags=tags_str)

def parse_existing_image_infos(text: str) -> List[ImageInfo]:
	PARSE_IMAGE_INFO_REGEX = r"(?:(?:[\s\S]*?new ImageInfo\()(?:[\s\S]*?)\"([\s\S]*?)\",(?:[\s\S]*?)\"([\s\S]*?)\",(?:[\s\S]*?)\[([\s\S]*?)\](?:[\s\S]*?)\),?)"
	PARSE_TAGS_ARRAY_REGEX = r"\"([\s\S]*?)\"(?:,[\s]*)?"

	matched_image_infos = re.findall(PARSE_IMAGE_INFO_REGEX, text)
	image_infos = []

	for matched_image_info in matched_image_infos:
		tags = []
		for matched_tag in re.findall(PARSE_TAGS_ARRAY_REGEX, matched_image_info[2]):
			tags.append(matched_tag)
		image_infos.append(ImageInfo(file_path=matched_image_info[0], description=matched_image_info[1], tags=tags))
	return image_infos
	

# Returns a dictionary of parsed ImageInfo objects from text, with 
# key = image path
# value = ImageInfo object
def parse_existing_image_infos_into_dict(text: str) -> Dict[str, ImageInfo]:
	image_infos_dict = {}
	image_infos = parse_existing_image_infos(text)
	for image_info in image_infos:
		image_infos_dict[image_info.file_path] = image_info
	return image_infos_dict

# Returns extension of filePath.
def get_extension(filePath: str) -> str:
	return filePath.split('.')[-1]

# Returns filePath without any extension.
def get_base_name(filePath: str) -> str:
	stringList = filePath.split('.')
	if len(stringList) > 1: 
		# Remove last element from list
		stringList.pop(-1);
	return ''.join(stringList)

# Returns the filename without any extensions
def get_file_name(filePath: str) -> str:
	return get_base_name(filePath).split('/')[-1]

def is_image(entry: os.DirEntry):
	return entry.is_file() and get_extension(entry.path).lower() in IMAGE_FILE_EXTENSIONS

def sqaure_crop(image: Image) -> Image:
	# Set the new length to the smallest possible length
	new_length = min(image.size[0], image.size[1])
	width, height = image.size   # Get dimensions

	left = (width - new_length)/2
	top = (height - new_length)/2
	right = (width + new_length)/2
	bottom = (height + new_length)/2

	# Crop the center of the image
	return image.crop((left, top, right, bottom))

def get_image_paths_in_dir(path: str):
	"""Recursively finds all images"""
	if get_file_name(path) == "previews":
		return
	for entry in os.scandir(path):
		if entry.is_dir(follow_symlinks=False):
			yield from get_image_paths_in_dir(entry.path)  # see below for Python 2.x
		elif is_image(entry):
			yield entry.path


def check_previews_dir_helper(path: str):
	for entry in os.scandir(path):
		if entry.is_dir(follow_symlinks=False):
			main_dir_path = entry.path.replace(PICTURES_PAGE_IMAGES_DIR + "previews/", PICTURES_PAGE_IMAGES_DIR)
			if not os.path.isdir(main_dir_path):
				shutil.rmtree(entry.path)
				# Skip because we've deleted this directory as it does not exist in main
				continue
			check_previews_dir_helper(entry.path)

def check_main_dir_helper(path: str):
	for entry in os.scandir(path):
		if entry.is_dir(follow_symlinks=False):
			if get_file_name(entry.path) == "previews":
				continue
			previews_dir_path = entry.path.replace(PICTURES_PAGE_IMAGES_DIR, PICTURES_PAGE_IMAGES_DIR + "previews/")
			if not os.path.isdir(previews_dir_path):
				os.mkdir(previews_dir_path)
			check_main_dir_helper(entry.path)  # see below for Python 2.x

def update_preview_dir_structure():
	# Add missing directories
	check_main_dir_helper(PICTURES_PAGE_IMAGES_DIR)
	# Delete nonexistant directories
	check_previews_dir_helper(PICTURES_PAGE_IMAGES_DIR + "previews/")



# Main code

print("Begin updating picture page images...")
start_time = time.perf_counter()

image_paths = list(get_image_paths_in_dir(PICTURES_PAGE_IMAGES_DIR))

image_paths.sort()

typescript_file = open(PICTURES_PAGE_IMAGES_TYPESCRIPT_FILE, "r+")
original_typescript_file_text = typescript_file.read()
existing_image_infos_dict = parse_existing_image_infos_into_dict(original_typescript_file_text)

image_infos = []
current_images = set()

update_preview_dir_structure()

for path in tqdm(image_paths, desc="Processing images"):
	image = None
	extension = get_extension(path)
	
	# Convert file to png if it is not.
	if extension != "png" and extension.lower() in IMAGE_FILE_EXTENSIONS:
		if image is None:
			image = Image.open(path)
		new_path = get_base_name(path) + ".png";
		image.save(new_path)
		image.close()
		# Delete old file
		os.remove(path)
		path = new_path
		image = Image.open(path)
	
	
	# Generate preview if it does not exist
	preview_path = get_base_name(path).replace(PICTURES_PAGE_IMAGES_DIR, PICTURES_PAGE_IMAGES_DIR + "previews/") + ".png"
	if not os.path.isfile(preview_path):
		if image is None:
			image = Image.open(path)
		image = sqaure_crop(image)
		image.thumbnail((200, 200), Image.ANTIALIAS)
		image.save(preview_path)
		image.close()

	# Use existing ImageInfo if it exists
	# Note that images that are removed but still have ImageInfo's will not be included,
	# thus this automatically removes them.
	relative_path = get_base_name(path.replace(PICTURES_PAGE_IMAGES_DIR, "")).replace("\\", "/") + ".png"
	if relative_path in existing_image_infos_dict:
		image_infos.append(existing_image_infos_dict[relative_path])
	else:
		image_infos.append(ImageInfo(file_path=relative_path))
	current_images.add(relative_path)

# Delete all previews for images that no longer exist
preview_file_entries = [entry for entry in os.scandir(PICTURES_PAGE_IMAGES_DIR + "previews/")]
for entry in tqdm(preview_file_entries, desc="Delete redundant previews"):
	time.sleep(0.001)
	if entry.is_dir(follow_symlinks=False):
		for entry in os.scandir(entry.path):
			preview_file_entries.append(entry)
		continue
	relative_path = entry.path.replace(PICTURES_PAGE_IMAGES_DIR + "previews/", "").replace("\\", "/")
	if not relative_path in current_images:
		os.remove(entry.path)

IMAGE_INFO_INSERTION_POINT_REGEX = r"([\s\S]*?export const PicturesPageImages = \[)(?:[\s\S]*)(\][\s\S]*)"

insertion_point_matches = re.findall(IMAGE_INFO_INSERTION_POINT_REGEX, original_typescript_file_text)
# Text before the insertion point.
first_half = insertion_point_matches[0][0]
# Text after the insertion point.
second_half = insertion_point_matches[0][1]

# Sandwich the actual text between the first_half and second_half to generate the compelte typescript file.

generated_typescript_text = first_half + "\n"

for image_info in image_infos:
	generated_typescript_text += image_info.to_typescript_string()

generated_typescript_text += second_half

typescript_file.seek(0)
typescript_file.write(generated_typescript_text)
typescript_file.truncate()
typescript_file.close()

time_taken = time.perf_counter() - start_time
print("Done in {time} s".format(time=time_taken))