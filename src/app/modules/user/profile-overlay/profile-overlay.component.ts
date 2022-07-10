import { animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, style } from '@angular/animations';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, ElementRef, Input, OnDestroy, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CdnService } from '@src/app/services/cdn.service';
import { CssLengthService } from '@src/app/services/css-length.service';
import { getClassYearString, getSidePanelPositions } from '@src/app/utils/_utils.module';
import { User } from '@src/generated/graphql-endpoint.types';
import { PartialDeep } from 'type-fest';

@Component({
  selector: 'app-profile-overlay',
  templateUrl: './profile-overlay.component.html',
  styleUrls: ['./profile-overlay.component.css'],
})
export class ProfileOverlayComponent implements OnDestroy {
  @Input() user: PartialDeep<User> = {};
  @ViewChild('overlayTemplate', { read: TemplateRef }) overlayTemplate?: TemplateRef<any>;
  get overlayAnimRoot() {
    return this.overlayRef?.overlayElement.querySelector('.overlayAnimRoot');
  }

  hover: boolean = false;
  overlayRef?: OverlayRef;
  currAnimPlayer?: AnimationPlayer;

  constructor(
    public cdnService: CdnService,
    private animBuilder: AnimationBuilder,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef,
    private cssLength: CssLengthService,
  ) {}

  ngOnDestroy(): void {
    if (this.currAnimPlayer) this.currAnimPlayer.destroy();
    if (this.overlayRef) this.overlayRef.dispose();
  }

  readonly timings = `200ms ease-out`;
  getOpenAnimation(): AnimationMetadata[] {
    return [
      style({
        transform: 'translateY(-5%)',
        opacity: 0,
      }),
      animate(
        this.timings,
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
        this.timings,
        style({
          transform: 'translateY(5%)',
          opacity: 0,
        }),
      ),
    ];
  }

  onMouseEnter() {
    this.hover = true;

    if (!this.overlayTemplate) return;
    if (this.overlayRef) {
      this.currAnimPlayer?.destroy();
      this.overlayRef.dispose();
    }
    this.overlayRef = this.overlay.create({
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions(getSidePanelPositions(0, this.cssLength.convertToNumber('1em', 'px'))),
    });
    this.overlayRef.attach(new TemplatePortal(this.overlayTemplate, this.viewContainerRef));

    if (this.currAnimPlayer) this.currAnimPlayer.destroy();
    this.currAnimPlayer = this.animBuilder.build(this.getOpenAnimation()).create(this.overlayAnimRoot);
    this.currAnimPlayer.onDone(() => (this.currAnimPlayer = undefined));
    this.currAnimPlayer.play();
  }

  async onMouseExit() {
    this.hover = false;

    if (!this.overlayRef) return;
    // if (this.currAnimPlayer) this.currAnimPlayer.destroy();
    // this.currAnimPlayer = this.animBuilder.build(this.getCloseAnimation()).create(this.overlayAnimRoot);
    // this.currAnimPlayer.onDone(() => {
    //   this.currAnimPlayer = undefined;
    //   // this.overlayRef?.dispose();
    //   // this.overlayRef = undefined;
    // });
    // this.currAnimPlayer.play();
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
  }

  getClassYearString = getClassYearString;
}
