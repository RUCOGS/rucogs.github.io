#!/usr/bin/env python3

# The packages needed for running this file are stored under "requirements.txt"
# Run 'pip install -r requirements.txt' from this repository's folder to install the dependendecies.

from typing import List, Dict
from tqdm import tqdm
import time
import os
import re

ARTICLE_FILE_EXTENSIONS = [ "md" ]
ARTICLES_DIR = "src/assets/blog-page-articles/"
ARTICLES_TYPESCRIPT_FILE = "src/app/settings/blog-page-articles.ts"

class ArticleInfo:
	def __init__(self, 
		file_path: str, 
		title: str = "", 
		description: str = "", 
		date: str = "", 
		imagePath: str = "", 
		authors = [],
		tags = []) -> None:
		self.file_path = file_path
		self.title = title
		self.description = description
		self.date = date
		self.imagePath = imagePath
		self.authors = authors
		self.tags = tags

	def __str__(self) -> str:
		return "ArticleInfo:{ file_path: '" + self.file_path + "', description: '" + self.description + "', tags: ['" + "', '".join(self.tags) + "'] }"

	def to_typescript_string(self) -> str:
		authors_str = ""
		for author in self.authors:
			authors_str += '"' + author + '", '
		if len(authors_str) > 0:
			# Remove the extra comma and space if we have just one author
			authors_str = authors_str[0:-2]

		tags_str = ""
		for tag in self.tags:
			tags_str += '"' + tag + '", '
		if len(tags_str) > 0:
			# Remove the extra comma and space if we have just one tag
			tags_str = tags_str[0:-2]
		
		return """  new ArticleInfo(
    /* File path   */ "{file_path}",
    /* Title       */ "{title}",
    /* Description */ "{description}",
    /* Date        */ "{date}",
    /* Image Path  */ "{imagePath}",
    /* Authors     */ [{authors}],
    /* Tags        */ [{tags}],
  ),
""".format(
	file_path=self.file_path, 
	title=self.title,
	description=self.description, 
	date=self.date,
	imagePath=self.imagePath,
	authors=authors_str,
	tags=tags_str)

def parse_existing_article_infos(text: str) -> List[ArticleInfo]:
	PARSE_ARTICLE_INFO_REGEX = r"(?:(?:[\s\S]*?new ArticleInfo\()(?:[\s\S]*?)\"([\s\S]*?)\",(?:[\s\S]*?)\"([\s\S]*?)\",(?:[\s\S]*?)\"([\s\S]*?)\",(?:[\s\S]*?)\"([\s\S]*?)\",(?:[\s\S]*?)\"([\s\S]*?)\",(?:[\s\S]*?)\[([\s\S]*?)\],(?:[\s\S]*?)\[([\s\S]*?)\],(?:[\s\S]*?)\),?)"
	PARSE_STRING_ARRAY_REGEX = r"\"([\s\S]*?)\"(?:,[\s]*)?"

	matched_article_infos = re.findall(PARSE_ARTICLE_INFO_REGEX, text)
	article_infos = []

	for matched_article_info in matched_article_infos:
		authors = []
		for matched_author in re.findall(PARSE_STRING_ARRAY_REGEX, matched_article_info[5]):
			authors.append(matched_author)
		tags = []
		for matched_tag in re.findall(PARSE_STRING_ARRAY_REGEX, matched_article_info[6]):
			tags.append(matched_tag)
		article_infos.append(ArticleInfo(
			file_path=matched_article_info[0], 
			title=matched_article_info[1], 
			description=matched_article_info[2], 
			date=matched_article_info[3], 
			imagePath=matched_article_info[4], 
			authors=authors, 
			tags=tags)
		)
	return article_infos
	

# Returns a dictionary of parsed ArticleInfo objects from text, with 
# key = image path
# value = ArticleInfo object
def parse_existing_article_infos_into_dict(text: str) -> Dict[str, ArticleInfo]:
	article_infos_dict = {}
	article_infos = parse_existing_article_infos(text)
	for article_info in article_infos:
		article_infos_dict[article_info.file_path] = article_info
	return article_infos_dict

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

def is_article(entry: os.DirEntry):
	return entry.is_file() and get_extension(entry.path) in ARTICLE_FILE_EXTENSIONS

def get_article_paths_in_dir(path: str):
	"""Recursively finds all articles"""
	for entry in os.scandir(path):
		if entry.is_dir(follow_symlinks=False):
			yield from get_article_paths_in_dir(entry.path)  # see below for Python 2.x
		elif is_article(entry):
			yield entry.path.replace("\\", "/")



# Main code

print("Begin updating articles...")
start_time = time.perf_counter()

article_paths = list(get_article_paths_in_dir(ARTICLES_DIR))

article_paths.sort()

typescript_file = open(ARTICLES_TYPESCRIPT_FILE, "r+")
original_typescript_file_text = typescript_file.read()
existing_article_infos_dict = parse_existing_article_infos_into_dict(original_typescript_file_text)

article_infos = []

for path in tqdm(article_paths, desc="Processing articles"):
	
	PARSE_ARTICLE_METADATA_REGEX = r"(?:(?:[\s\S]*?)<!--(?:[\s\S]*?)Title:(?:[\s]*)([\s\S]*?)\n(?:[\s\S]*?)Description:(?:[\s]*)([\s\S]*?)\n(?:[\s\S]*?)Date:(?:[\s]*)([\s\S]*?)\n(?:[\s\S]*?)Image:(?:[\s]*)([\s\S]*?)\n(?:[\s\S]*?)Authors:(?:[\s]*)([\s\S]*?)\n(?:[\s\S]*?)Tags:(?:[\s]*)([\s\S]*?)\n)";

	"""
Meta data format:

<!-- METADATA ---
	Title: 			The Big Markdown File
	Description:	SOme description
	Date:			March 29, 2022
	Image:			assets/images /oof.png
	Authors: 		Bob, Joe
	Tags:			hello, asdf
---------------->
	"""
	file = open(path, 'r')
	file_text = file.read();
	matched_article_infos = re.findall(PARSE_ARTICLE_METADATA_REGEX, file_text)[0]
	
	# Use get_base_name to remove extension
	# We are assuming all articles are stored in markdown format
	relative_path = get_base_name(path.replace(ARTICLES_DIR, ""))
	
	article_infos.append(ArticleInfo(
		file_path=relative_path, 
		title=matched_article_infos[0],
		description=matched_article_infos[1],
		date=matched_article_infos[2],
		imagePath=matched_article_infos[3],
		authors=matched_article_infos[4].split(", "),
		tags=matched_article_infos[5].split(", ")
	))

ARTICLE_INFO_INSERTION_POINT_REGEX = r"([\s\S]*?export const BlogPageArticles = \[)(?:[\s\S]*)(\][\s\S]*)"

insertion_point_matches = re.findall(ARTICLE_INFO_INSERTION_POINT_REGEX, original_typescript_file_text)
# Text before the insertion point.
first_half = insertion_point_matches[0][0]
# Text after the insertion point.
second_half = insertion_point_matches[0][1]

# Sandwich the actual text between the first_half and second_half to generate the compelte typescript file.

generated_typescript_text = first_half + "\n"

for article_info in article_infos:
	generated_typescript_text += article_info.to_typescript_string()

generated_typescript_text += second_half

typescript_file.seek(0)
typescript_file.write(generated_typescript_text)
typescript_file.truncate()
typescript_file.close()

time_taken = time.perf_counter() - start_time
print("Done in {time} s".format(time=time_taken))