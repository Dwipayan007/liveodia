bVer =  parseInt(navigator.appVersion);
if (bVer >= 4)
{
  if (navigator.appName == "Netscape") {
    document.write ('<link rel="fontdef" src="http://bibarani.com/fonts/Shree-Ori-0601W.pfr">');
  } else  {
    document.write ('<style type="text/css">');
    document.write ('@font-face {');
    document.write ('font-family: Shree-Ori-0601W;');
    document.write ('font-style : normal;');
    document.write ('font-weight: normal;');
    document.write ('src:url("https://bibarani.com/fonts/SHREEOR0.eot");');    document.write ('}');
    document.write ('</style>');
  }
}
