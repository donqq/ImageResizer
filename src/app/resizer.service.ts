import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResizerService {

  constructor() { }

  resizeImage(nWidth: number, imgSrc: string): Promise<string> { // image received, width received.
    const img = document.createElement('img');
    img.src = imgSrc; // IMG.SRC received the image source from imgSrc.
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const onLoadPromise: Promise<string> = new Promise(resolve => {
          img.onload = () => { // Image draws successfully
          canvas.width = nWidth;
          canvas.height = ((nWidth * img.height) / img.width);
          context.imageSmoothingEnabled = true;
          context.imageSmoothingQuality = 'high';
          context.drawImage(img, 0, 0, canvas.width, canvas.height); // aspect ratio equation h2 = (w2 x h1)/w1
          resolve(canvas.toDataURL());
        };
    });

    return onLoadPromise;
  }
}
