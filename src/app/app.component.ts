import { Component } from '@angular/core';
import { ResizerService } from './resizer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ImageRescaler';
  originalImage = '';
  resizedImage = '';
  originalImageWidth = '';
  resizedImageWidth = '';
  imageWidth = '';

  constructor(private resizer: ResizerService) {

  }

  public uploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const image = new Image();
      image.src = reader.result.toString();

      image.onload = () => {
        if (Number(this.imageWidth)) {
          this.resizer.resizeImage(Number(this.imageWidth), image.src).then(value => {
            const imageResized = new Image();
            imageResized.src = value;

            this.originalImage = image.src;
            this.resizedImage = imageResized.src;

            imageResized.onload = () => {
              this.originalImageWidth = 'Original Image\'s Width is ' + image.width.toString() + ' px';
              this.resizedImageWidth = 'Resized Image\'s Width is ' + imageResized.width.toString() + ' px';
            };
          });
        } else {
          alert('The value should be an integer');
        }
      };
    };
  }


}
