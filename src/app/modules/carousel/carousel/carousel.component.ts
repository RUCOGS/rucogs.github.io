import {
  animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, style
} from '@angular/animations';
import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input, OnDestroy, QueryList, TemplateRef, ViewChild
} from '@angular/core';
import { CarouselItemDirective } from '../carousel-item/carousel-item.directive';

@Component({
  selector: 'app-carousel',
  templateUrl: `carousel.component.html`,
  styleUrls: ['./carousel.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CarouselComponent implements AfterViewInit, OnDestroy {

  @ContentChildren(CarouselItemDirective) slides?: QueryList<CarouselItemDirective>;
  @ViewChild('transitionAnimationRoot') transAnimRoot!: ElementRef;
  @Input() visibleSlides = 1;
  @Input() autoplay: boolean = false;
  @Input() autoplayDurationMS: number = 2000;
  @Input() timings = `250ms ease-out`;

  currentSlides: CarouselItemDirective[] = [];

  gap = "1em";
  slideState: string = 'current';
  currentSlideIndex: number = 0;
  player!: AnimationPlayer;
  autoPlayIntervalId?: any;

  constructor(
    private elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef,
    private animBuilder: AnimationBuilder
  ) { }

  ngOnDestroy(): void {
    if (this.player)
      this.player.destroy();
    this.stopAutoPlay();
  }

  ngAfterViewInit(): void {
    this.updateCurrentSlide(0);
    if (this.autoplay)
      this.startAutoPlay();
    this.changeDetector.detectChanges();
  }

  updateCurrentSlide(index: number) {
    if (!this.slides)
      return;
    
    function positiveMod(n: number, mod: number) {
      return ((n % mod) + mod) % mod;
    }

    function spliceWrap(array: any[], index: number, count: number) {
      const result: any[] = [];
      for (let i = 0; i < count; i++) {
        const wrappedIndex = positiveMod(index + i, array.length);
        result.push(array[wrappedIndex]);
      }
      return result;
    }

    const slidesArray = this.slides.toArray();
    this.currentSlideIndex = positiveMod(index, slidesArray.length);

    this.currentSlides = spliceWrap(slidesArray, this.currentSlideIndex - 1, this.visibleSlides + 2);
  }

  getSlidePercentageWidth() {
    return 100.0 / this.visibleSlides;
  }

  getNextAnimation(): AnimationMetadata[] {
    return [style({
      transform: `translateX(${this.getSlidePercentageWidth()}%)` 
      }), animate(this.timings, style({ 
        transform: 'translateX(0)' 
      }))];
  }

  getPreviousAnimation(): AnimationMetadata[] {
    return [style({ 
      transform: `translateX(-${this.getSlidePercentageWidth()}%)` 
      }), animate(this.timings, style({ 
        transform: 'translateX(0)' 
      }))];
  }

  next(interruptAutoPlay: boolean = false) {
    if (this.player) {
      this.player.finish();
      this.player.destroy();
    }
    if (interruptAutoPlay)
      this.stopAutoPlay();
    
    this.player = this.animBuilder.build(this.getNextAnimation()).create(this.transAnimRoot.nativeElement);
    this.player.play();
    this.updateCurrentSlide(this.currentSlideIndex + 1);
  }
  
  previous(interruptAutoPlay: boolean = false) {
    if (this.player) {
      this.player.finish();
      this.player.destroy();
    }
    if (interruptAutoPlay)
      this.stopAutoPlay();
    
    this.player = this.animBuilder.build(this.getPreviousAnimation()).create(this.transAnimRoot.nativeElement);
    this.player.play();
    this.updateCurrentSlide(this.currentSlideIndex - 1);
  }

  stopAutoPlay() {
    if (this.autoPlayIntervalId) {
      clearInterval(this.autoPlayIntervalId);
      this.autoPlayIntervalId = undefined;
    }
  }

  startAutoPlay() {
    if (this.autoPlayIntervalId)
      return;
    
    this.autoPlayIntervalId = setInterval(() => {
      this.next();
    }, this.autoplayDurationMS);
  }

  getOffsetStyle() {
    return {
      'transform': `translateX(-${this.getSlidePercentageWidth()}%)`,
      'gap': this.gap
    };
  }

  getItemStyle() {
    return {
      'width': (this.elementRef.nativeElement.offsetWidth / this.visibleSlides) + "px",
      'height': this.elementRef.nativeElement.offsetHeight + "px",
    };
  }
}
