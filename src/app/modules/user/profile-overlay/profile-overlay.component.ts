import { animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, style } from '@angular/animations';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Color, WithDestroy } from '@src/app/classes/_classes.module';
import { BreakpointManagerService } from '@src/app/services/breakpoint-manager.service';
import { CdnService } from '@src/app/services/cdn.service';
import { CssLengthService } from '@src/app/services/css-length.service';
import { OverlayService } from '@src/app/services/overlay.service';
import { getClassYearString, getSidePanelPositions } from '@src/app/utils/_utils.module';
import { User } from '@src/generated/graphql-endpoint.types';
import { SettingsService } from '@src/_settings';
import ColorThief from 'colorthief';
import { takeUntil } from 'rxjs';
import { Mixin } from 'ts-mixer';
import { PartialDeep } from 'type-fest';

@Component({
  selector: 'app-profile-overlay',
  templateUrl: './profile-overlay.component.html',
  styleUrls: ['./profile-overlay.component.css'],
})
export class ProfileOverlayComponent extends Mixin(WithDestroy) implements AfterViewChecked, OnDestroy, OnInit {
  @Input() trigger: 'click' | 'hover' = 'click';
  @Input() user: PartialDeep<User> = {};
  @ViewChild('overlayTemplate', { read: TemplateRef }) overlayTemplate?: TemplateRef<any>;
  @ViewChild('container') container?: ElementRef;

  get ignoreOverlay() {
    return this.breakpointManager.matchedBreakpointOrBelow('MEDIUM_MOBILE');
  }

  get overlayRoot() {
    return this.overlayRef?.overlayElement?.querySelector('.overlayRoot');
  }
  get avatar() {
    return this.overlayRef?.overlayElement?.querySelector<HTMLImageElement>('img.profile-overlay.avatar');
  }

  bannerColor: Color = Color.Types.white;
  hover: boolean = false;
  overlayRef?: OverlayRef;
  currAnimPlayer?: AnimationPlayer;

  private closeWhenOutsideViewportObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting && this.elementRef) {
        this.close();
      }
    });
  });

  constructor(
    public cdnService: CdnService,
    public settings: SettingsService,
    private animBuilder: AnimationBuilder,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef,
    private cssLength: CssLengthService,
    private overlayService: OverlayService,
    private router: Router,
    private breakpointManager: BreakpointManagerService,
  ) {
    super();
  }

  ngOnInit(): void {
    if (!this.ignoreOverlay && this.trigger === 'click') {
      this.overlayService.onClick$.pipe(takeUntil(this.onDestroy$)).subscribe((e) => {
        if (!this.container || this.overlayRoot?.contains(e.target as Node)) return;
        if (this.container.nativeElement.contains(e.target)) {
          this.toggle();
        } else {
          this.close();
        }
      });
    }
  }

  setupBannerColorListeners: boolean = false;
  ngAfterViewChecked(): void {
    this.trySetupBannerColorListeners();
  }

  onMouseDown() {
    if (this.ignoreOverlay) {
      this.onProfileClick();
    }
  }

  onProfileClick() {
    this.router.navigateByUrl(`/members/${this.user.username}`);
  }

  ngOnDestroy(): void {
    if (this.currAnimPlayer) this.currAnimPlayer.destroy();
    if (this.overlayRef) this.overlayRef.dispose();
    this.closeWhenOutsideViewportObserver.disconnect();
  }

  trySetupBannerColorListeners() {
    if (this.setupBannerColorListeners) return;

    const img = this.avatar;
    if (img) {
      img.setAttribute('crossOrigin', '');
      const colorThief = new ColorThief();
      img.addEventListener('load', () => {
        const [r, g, b] = colorThief.getColor(img);
        this.bannerColor = new Color(r, g, b);
      });
      this.setupBannerColorListeners = true;
    }
  }

  getBannerContainerStyle() {
    return {
      ...(this.bannerColor && { 'background-color': this.bannerColor.hexString() }),
    };
  }

  getOpenAnimation(): AnimationMetadata[] {
    return [
      style({
        transform: 'translateY(-5%)',
        opacity: 0,
      }),
      animate(
        `200ms ease-out`,
        style({
          transform: 'translateY(0)',
          opacity: 1,
        }),
      ),
    ];
  }

  getCloseAnimation(): AnimationMetadata[] {
    return [
      style({
        transform: 'translateY(0)',
        opacity: 1,
      }),
      animate(
        `100ms ease-out`,
        style({
          transform: 'translateY(2.5%)',
          opacity: 0,
        }),
      ),
    ];
  }

  toggle() {
    if (this.overlayRef) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (this.overlayRef || !this.overlayTemplate || !this.container) return;
    this.overlayRef = this.overlay.create({
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.container)
        .withPositions(getSidePanelPositions(0, this.cssLength.convertToNumber('1em', 'px'))),
    });
    this.overlayRef.attach(new TemplatePortal(this.overlayTemplate, this.viewContainerRef));

    if (this.currAnimPlayer) this.currAnimPlayer.destroy();
    this.currAnimPlayer = this.animBuilder.build(this.getOpenAnimation()).create(this.overlayRoot);
    this.currAnimPlayer.onDone(() => (this.currAnimPlayer = undefined));
    this.currAnimPlayer.play();

    this.closeWhenOutsideViewportObserver.observe(this.container.nativeElement);
  }

  close() {
    if (!this.overlayRef || !this.container) return;

    this.closeWhenOutsideViewportObserver.unobserve(this.container.nativeElement);

    if (this.currAnimPlayer) this.currAnimPlayer.destroy();

    this.currAnimPlayer = this.animBuilder.build(this.getCloseAnimation()).create(this.overlayRoot);
    this.currAnimPlayer.onDone(() => {
      this.currAnimPlayer = undefined;
      this.overlayRef?.dispose();
      this.overlayRef = undefined;
    });
    this.currAnimPlayer.play();
  }

  onMouseEnter() {
    this.hover = true;

    if (!this.ignoreOverlay && this.trigger === 'hover') this.open();
  }

  onMouseExit() {
    this.hover = false;

    if (!this.ignoreOverlay && this.trigger === 'hover') this.close();
  }

  onVisibilityChanged(visibile: any) {
    if (!visibile && this.elementRef) {
      this.close();
    }
  }

  getClassYearString = getClassYearString;
}
