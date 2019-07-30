import { SliderBusiness } from './../../../core/Business/SliderBusiness';
import { SliderModel } from './../../../core/model/SliderModel';
import { IImageModel } from './../../../core/model/IImageModel';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();

  imageSources: (string | IImageModel)[] = [];

  height = '300px';
  arrowSize = '30px';
  showArrows = true;
  disableSwiping = false;
  autoPlay = true;
  autoPlayInterval = 5000;
  stopAutoPlayOnSlide = false;
  backgroundSize = 'cover';
  backgroundPosition = 'center  center';
  backgroundRepeat = 'no-repeat';
  showDots = true;
  dotColor = '#ff2851';
  showCaptions = true;
  captionColor = '#ff2851';
  captionBackground = 'rgba(0, 0, 0, .35)';
  lazyLoad = false;
  hideOnNoSlides = true;
  width = '100%';

  constructor(private Businesss: SliderBusiness,
    public toastr: ToastrManager) { }

  ngOnInit() {
    this.GetSlider();
  }

  GetSlider() {
    this.Businesss.GetSlider().pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.imageSources =  x;
    }, (error) => {
      this.toastr.errorToastr('Something went wrong!');
    });
  }

  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }


}
