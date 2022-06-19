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
import { CssLengthService } from '@src/app/services/css-length.service';
import { positiveMod, spliceWrap } from '@src/app/utils/_utils.module';
import { CarouselItemDirective } from '../carousel-item/carousel-item.directive';

@Component({
  selector: 'app-carousel',
  templateUrl: `carousel.component.html`,
  styleUrls: ['./carousel.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CarouselComponent implements AfterViewInit, OnDestroy {

  @ContentChildren(CarouselItemDirective) slides?: QueryList<CarouselItemDirective>;
  @ViewChild('transitionAnimationRoot') transAnimRoot?: ElementRef;
  @ViewChild('fadeOutTransitionAnimationRoot') fadeOutTransAnimRoot?: ElementRef;
  @ViewChild('carouselButtonsContainer') carouselButtonsContainer?: ElementRef;
  @Input() visibleSlides = 1;
  @Input() autoplay: boolean = false;
  @Input() autoplayDurationMS: number = 2000;
  @Input() timings = `250ms ease-out`;
  @HostBinding('style.display') display = "inline-block";

  currentSlides: CarouselItemDirective[] = [];
  fadeoutSlides: CarouselItemDirective[] = [];

  gap = "0.5em";
  currentSlideIndex: number = 0;
  slidePlayer?: AnimationPlayer;
  fadeInPlayer?: AnimationPlayer;
  fadeOutPlayer?: AnimationPlayer;
  autoPlayIntervalId?: any;
  sidePadding = "2em";

  constructor(
    private elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef,
    private animBuilder: AnimationBuilder,
    private cssLength: CssLengthService,
  ) { }

  ngOnDestroy(): void {
    if (this.slidePlayer)
      this.slidePlayer.destroy();
    if (this.fadeOutPlayer)
      this.fadeOutPlayer.destroy();
    if (this.fadeInPlayer)
      this.fadeInPlayer.destroy();
    this.stopAutoPlay();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.slides || this.slides.length === 0) {
        // Change detection complains if we update inside of ngAfterViewInit.
        this.display = 'none';
        return;
      }
      this.updateCurrentSlide(0);
      if (this.autoplay)
        this.startAutoPlay();
      this.changeDetector.detectChanges();
    });
  }

  updateCurrentSlide(index: number) {
    if (!this.slides)
      return;

    const slidesArray = this.slides.toArray();
    this.currentSlideIndex = positiveMod(index, slidesArray.length);

    this.currentSlides = spliceWrap(slidesArray, this.currentSlideIndex - 1, this.visibleSlides + 2);
  }

  getSlidePercentageWidth() {
    return 100.0 / this.visibleSlides;
  }

  getAnimationTransform(direction: number = 1) {
    return `translateX(calc(${direction} * ${this.getSlidePercentageWidth()}%)`;
  }

  getDefaultAnimationTransform() {
    return `translateX(0)`;
  }

  getNextAnimation(): AnimationMetadata[] {
    return [style({
      transform: this.getAnimationTransform(1) 
      }), animate(this.timings, style({ 
        transform: this.getDefaultAnimationTransform()
      }))];
  }

  getPreviousAnimation(): AnimationMetadata[] {
    return [style({ 
      transform: this.getAnimationTransform(-1)
      }), animate(this.timings, style({ 
        transform: this.getDefaultAnimationTransform()
      }))];
  }

  getFadeoutAnimation(): AnimationMetadata[] {
    return [style({ 
      transform: 'translateY(0)',
      opacity: 1
      }), animate(this.timings, style({ 
        transform: 'translateY(100%)',
        opacity: 0
      }))];
  }

  getFadeinAnimation(): AnimationMetadata[] {
    return [style({ 
      transform: 'translateY(-100%)',
      opacity: 0,
      }), animate(this.timings, style({ 
        transform: 'translateY(0)',
        opacity: 1
      }))];
  }

  next(interruptAutoPlay: boolean = false) {
    if (!this.transAnimRoot)
      return;
    if (this.slidePlayer) {
      this.slidePlayer.finish();
      this.slidePlayer.destroy();
    }
    if (interruptAutoPlay)
      this.stopAutoPlay();
    
    this.slidePlayer = this.animBuilder.build(this.getNextAnimation()).create(this.transAnimRoot.nativeElement);
    this.slidePlayer.play();
    this.updateCurrentSlide(this.currentSlideIndex + 1);
  }
  
  previous(interruptAutoPlay: boolean = false) {
    if (!this.transAnimRoot)
      return;
    if (this.slidePlayer) {
      this.slidePlayer.finish();
      this.slidePlayer.destroy();
    }
    if (interruptAutoPlay)
      this.stopAutoPlay();
    
    this.slidePlayer = this.animBuilder.build(this.getPreviousAnimation()).create(this.transAnimRoot.nativeElement);
    this.slidePlayer.play();
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
      'transform': this.getDefaultAnimationTransform(),
      'gap': this.gap
    };
  }

  getCarouselPxWidth() {
    return this.elementRef.nativeElement.offsetWidth - 2 * this.cssLength.convertToNumber(this.sidePadding, 'px');
  }

  getPaddedCarouselPxWidth() {
    return this.elementRef.nativeElement.offsetWidth - this.cssLength.convertToNumber(this.sidePadding, 'px');
  }

  getItemStyle() {
    return {
      'width': (this.getPaddedCarouselPxWidth() / this.visibleSlides - this.cssLength.convertToNumber(this.gap, 'px') * (this.visibleSlides - 1) * 0.5) + "px",
      'height': this.elementRef.nativeElement.offsetHeight + "px",
    };
  }

  fadeToSlide(index: number, interruptAutoplay: boolean) {
    if (!this.transAnimRoot || !this.fadeOutTransAnimRoot)
      return;
    if (this.fadeOutPlayer) {
      this.fadeOutPlayer.finish();
      this.fadeOutPlayer.destroy();
    }
    if (this.fadeInPlayer) {
      this.fadeInPlayer.finish();
      this.fadeInPlayer.destroy();
    }

    if (interruptAutoplay)
      this.stopAutoPlay();

    this.fadeoutSlides = this.currentSlides.slice(0);
    this.updateCurrentSlide(index);
    
    this.fadeInPlayer = this.animBuilder.build(this.getFadeinAnimation()).create(this.transAnimRoot.nativeElement);
    
    this.fadeOutPlayer = this.animBuilder.build(this.getFadeoutAnimation()).create(this.fadeOutTransAnimRoot.nativeElement);

    this.fadeInPlayer.play();
    this.fadeOutPlayer.play();
  }

  gotoSlide(index: number) {
    index = positiveMod(index, this.slides!.length)
    if (this.currentSlideIndex === index)
      return;
    if (positiveMod(this.currentSlideIndex + 1, this.slides!.length) === index)
      this.next();
    else if (positiveMod(this.currentSlideIndex - 1, this.slides!.length) === index)
      this.previous();
    else
      this.fadeToSlide(index, true);
  }

  areCarouselButtonsVisible() {
    if (!this.carouselButtonsContainer)
      return false;
    
    return this.getCarouselPxWidth() >= this.carouselButtonsContainer.nativeElement.offsetWidth;
  }

  getCarouselContainerStyle() {
    return {
      'padding-left': this.sidePadding,
      'padding-right': this.sidePadding,
    }
  }

  getCarouselButtonsContainerStyle() {
    return {
      'visibility': this.areCarouselButtonsVisible() ? 'visible' : 'hidden'
    };
  }
}
