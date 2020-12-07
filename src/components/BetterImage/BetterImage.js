import React from 'react';
import { Img } from 'react-image';

export default function BetterImage(props) {
  ////////////////////* Hoisted Variables *////////////
  let { resize, source, quality, rotation, blur, grayscale, brightness, contrast, sepia, invert, saturate, opacity, hueRotate, dropShadow, roundCorners, border, matrix, translate, scale, skew, perspective, rotateX, rotateY } = props;

  const fileName = source.split('/').pop();
  const originalImageType = fileName.split('.').pop();
  const imgName = fileName.split('.').shift();

  let resizedImageWidth;
  let resizedImageHeight;
  let shadowX;
  let shadowY;
  let shadowSize;
  let shadowColor;
  let borderColor;
  let borderThick;
  let borderLine;
  let matrix1;
  let matrix2;
  let matrix3;
  let matrix4;
  let matrix5;
  let matrix6;
  let translatePx;
  let translatePercent;
  let scaleX;
  let scaleY;
  let skewX;
  let skewY;

  //////////////////////* Image Functionality */////////////////////
  function resizeFunc(string) {
    string = string.split("x");
    resizedImageHeight = string[0]
    resizedImageWidth = string[1]
  }

  function borderImage(string){
    string = string.split(",");
    borderThick = string[0];
    borderLine = string[1];
    borderColor = string[2];
  }
  
  function shadowImg(dropShadow){
    dropShadow = dropShadow.split(",");
    shadowX = dropShadow[0];
    shadowY = dropShadow[1];
    shadowSize = dropShadow[2];
    shadowColor = dropShadow[3];
  }

  function matrixImg(matrix){
    matrix = matrix.split(",");
    matrix1 = matrix[0];
    matrix2 = matrix[1];
    matrix3 = matrix[2];
    matrix4 = matrix[3];
    matrix5 = matrix[4];
    matrix6 = matrix[5];
  }

  function translateImg(translate){
    translate = translate.split(",");
    translatePx = translate[0];
    translatePercent = translate[1];
  }

  function scaleImg(scale){
    scale = scale.split(",");
    scaleX = scale[0];
    scaleY = scale[1];
  }

  function skewImg(skew){
    skew = skew.split(",");
    skewX = skew[0];
    skewY = skew[1];
  }

  function convertedImg(imgName, quality, originalImageType){
    fetch('/api/convert', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json' 
         },
        body: JSON.stringify({
          imageName: imgName,
          quality: quality,
          originalImageType: originalImageType
        })
    })
  }

  ////////////////////* Import all images in optimized folder */////////////////////
  function importAll(r) {
    let images = {};
    r.keys().map((item) => { images[item.replace('./', '')] = r(item) })
    return images;
  }

  const images = importAll(require.context('./convertedImage', false, /\.(png|jpe?g|webp|svg)$/));

  /////////////////* EPIC DEFAULT CHAIN *//////////////////////////
    function chainParameters(){
      // resize (optional)
      if (resize != null) {
        resizeFunc(resize);
      }
      // contrast (optional)
      if (contrast == null) contrast = 100;
      // sepia (optional)
      if (sepia == null) sepia = 0;
      // sturate (optional)
      if (saturate == null) saturate = 100;
      // blur (optional)
      if (blur == null) blur = 0;
      // opacity (optional)
      if (opacity == null) opacity = 100;
      // brightness (optional)
      if (brightness == null) brightness = 100;
      // grayscale (optional)
      if (grayscale == null) grayscale = 0;
      // rotation (optional)
      if (rotation == null) rotation = 0;
      // invert (optional)
      if (invert == null) invert = 0; 
      // hueRotate
      if (hueRotate == null) hueRotate = 0;
      // roundCorners
      if (roundCorners == null) roundCorners = 0;
      // perspective
      if (perspective == null) perspective = 0;
      // quality
      if (quality == null) quality = 100;
      // rotateX
      if (rotateX == null) rotateX = 0;
      // rotateY
      if (rotateY == null) rotateY = 0;
      // dropShadow (optional)
      if (dropShadow == null) {
        shadowX = 0;
        shadowY = 0;
        shadowSize = 0;
        shadowColor = "black";
      } else {
        shadowImg(dropShadow);
      }
      // border (optional)
      if (border == null) {
        borderThick = 0;
        borderLine = "solid";
        borderColor = "black";
      } else {
        borderImage(border)
      }
      // matrix (optional)
      if (matrix == null) {
        matrix1 = 1;
        matrix2 = 0;
        matrix3 = 0;
        matrix4 = 1;
        matrix5 = 0;
        matrix6 = 0;
      } else {
        matrixImg(matrix);
      }
      // translate (optional)
      if (translate == null) {
        translatePx = 0;
        translatePercent = 0;
      } else {
        translateImg(translate);
      }
      // scale (optional)
      if (scale == null) {
        scaleX = 1;
        scaleY = 1;
      } else {
        scaleImg(scale)
      }
      // skew (optional)
      if (skew == null) {
        skewX = 0;
        skewY = 0;
      } else {
        skewImg(skew)
      }
    }
    
  ////////////////////* Render the modifed image component */////////////////////
  return (
    <div>
      {chainParameters()}
      {images[`${imgName}.webp`] ? <Img src={[images[`${imgName}.webp`], images['placeholder.webp']]} style={{filter:`grayscale(${grayscale}%) blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) sepia(${sepia}%) invert(${invert}%) saturate(${saturate}%) opacity(${opacity}%) hue-rotate(${hueRotate}deg) drop-shadow(${shadowX}px ${shadowY}px ${shadowSize}px ${shadowColor})`, transform: `matrix(${matrix1}, ${matrix2}, ${matrix3}, ${matrix4}, ${matrix5}, ${matrix6}) translate(${translatePx}px, ${translatePercent}%) scale(${scaleX}, ${scaleY}) skew(${skewX}deg, ${skewY}deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg) perspective(${perspective}px) rotate(${rotation}deg)`, width: `${resizedImageWidth}px`, height: `${resizedImageHeight}px`, borderRadius: `${roundCorners}px`, border: `${borderThick}px ${borderLine} ${borderColor}`}} alt="image failed to load"/> : convertedImg(imgName, quality, originalImageType) }
    </div>
  );
}
