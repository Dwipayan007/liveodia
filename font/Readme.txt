Setup for using Dynamic Fonts

The following are the steps for using Dynamic Fonts on your Web-Site. This is for the case when we are deploying both PFR and EOT Files.

1. Create a Subdirectory named fonts in your Web-Server
3. Upload the FontName .EOT (Embedded Open Type) file containing all the characters of the Font to the Fonts folder on your Web-Server.
3. Upload PFR_EOT.js file on the webserver in the same folder.


Using dynamic fonts in Web-pages.

While generating Dynamic Font, the name of the font gets changed and a additional "W" added to the font name for e.g. if we are using Shree-Ori-0601W font of shreelipi while typing, the Dynamic Font name will be SHREE-DEV-0708W. This change is made because if the name of the Dynamic Font & Local ShreeLipi font remains same, the text shown on the website can not be seen properly.

Kindly install the TTF font given with dynamic font in windows\fonts directory and apply the font Shree-Ori-0601W to the Text in HTML files as required and then upload the files.

Other instructions are given below:

1. In each and every HTML page in which you want to use the dynamic fonts add the following lines of code between the <HEAD> and </HEAD>  tags


<SCRIPT SRC="http://bibarani.com/fonts/PFR_EOT.js" TYPE="text/javascript">
</SCRIPT>

<SCRIPT SRC="https://bibarani.com/fonts/PFR_EOT.js" TYPE="text/javascript">
</SCRIPT>

2. Set the FACE property of the <FONT> Tag to "Shree-Ori-0601W" for text.

or

You can apply "Shree-Ori-0601W" font to Classes or IDs in your centralize CSS file.


This completes the necessary steps for using the Font Shree-Ori-0601W in your WebPages.


Files that are th given to the user
1. EOT File
2. PFR_EOT.JS
3.SHREE601W.TTF
4. Readme.txt



