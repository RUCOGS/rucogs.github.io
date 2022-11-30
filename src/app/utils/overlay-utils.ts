import { ConnectionPositionPair } from '@angular/cdk/overlay';

export function getSidePanelPositions(paddingPx: number = 0, offsetMarginPx: number = 0) {
  return [
    new ConnectionPositionPair(
      { originX: 'end', originY: 'top' },
      { overlayX: 'start', overlayY: 'top' },
      paddingPx,
      -offsetMarginPx,
    ),
    new ConnectionPositionPair(
      { originX: 'start', originY: 'top' },
      { overlayX: 'end', overlayY: 'top' },
      -paddingPx,
      -offsetMarginPx,
    ),
    new ConnectionPositionPair(
      { originX: 'start', originY: 'bottom' },
      { overlayX: 'start', overlayY: 'top' },
      -offsetMarginPx,
      paddingPx,
    ),
    new ConnectionPositionPair(
      { originX: 'end', originY: 'bottom' },
      { overlayX: 'end', overlayY: 'top' },
      offsetMarginPx,
      paddingPx,
    ),
    new ConnectionPositionPair(
      { originX: 'start', originY: 'top' },
      { overlayX: 'start', overlayY: 'bottom' },
      -offsetMarginPx,
      -paddingPx,
    ),
    new ConnectionPositionPair(
      { originX: 'end', originY: 'top' },
      { overlayX: 'end', overlayY: 'bottom' },
      offsetMarginPx,
      -paddingPx,
    ),
  ];
}
