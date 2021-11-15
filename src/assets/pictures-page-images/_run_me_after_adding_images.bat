@REM NOTE: YOU MUST HAVE IMAGEMAGICK INSTALLED AND ADDED TO YOUR "PATH" ENVIRONMENT VARIABLE
@REM 	   IN ORDER FOR PREVIEWS TO BE GENERATED

@REM NOTE: This may jumble up the order of the images -- even if no new images
@REM 	   have been added. This is due to the batch file's for loop returning the files in
@REM 	   an unsorted manner.

@echo off

@REM Delayed expansion lets variables be evaluated once they are run.
@REM To get a delayed expanded varaible, you have to use !variable_name!

rd /S /Q previews
mkdir previews

setlocal enableDelayedExpansion
set /A i=0
for %%F in (*.png) do (
  set "name=%%F"
  
  @REM If the OLD version of the file exists, then
  @REM we must have renamed this file to have its
  @REM current name, and the original file holding
  @REM this name has been renamed to OLD_... .
  
  @REM Since we only want to rename on files that
  @REM are original, we skip renaming this file.
  
  if not exist "OLD_!name!" (
    set /a "i=!i!+1"
    if not "!i!.png"=="!name!" (
      if exist "!i!.png" (
        ren "!i!.png" "OLD_!i!.png"
      )
    )
    ren "!name!" "!i!.png"
  )
)

@REM Second pass for the OLD_*.png files.

for %%F in (OLD_*.png) do (
  set /a "i=!i!+1"
  set "name=%%F"
  ren "!name!" "!i!.png"
)

magick.exe mogrify -resize x200 -path "previews" *.png