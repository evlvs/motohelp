import { Component, ElementRef, ViewChild, ViewRef } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {
  @ViewChild('video') video!: ElementRef;

  playPause(event: any) {
    const vid = this.video.nativeElement as HTMLVideoElement;

    if(window.screen.width < 738) {

      if(vid.paused) {
        vid.requestFullscreen()
        vid.play()
      } else {
        vid.pause()
      }

    } else {
      if(vid.paused) {
        vid.play()
      } else {
        vid.pause()
      }
    }
    
  }
}
