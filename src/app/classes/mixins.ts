import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Directive, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { Subject } from "rxjs";
import { Mixin, settings } from "ts-mixer";

settings.initFunction = `init`;

@Directive()
export class WithDestroy implements OnDestroy {
  protected onDestroy$ = new Subject<void>();

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

@Directive()
export class WithInit implements OnInit {
  protected onInit$ = new Subject<void>();

  ngOnInit() {
    this.onInit$.next();
    this.onInit$.complete();
  }
}

@Directive()
export class WithAfterViewInit implements AfterViewInit {
  protected onAfterViewInit$ = new Subject<void>();

  ngAfterViewInit() {
    this.onAfterViewInit$.next();
    this.onAfterViewInit$.complete();
  }
}

@Directive()
export class WithAfterViewChecked extends Mixin(WithDestroy) implements AfterViewChecked {
  protected onAfterViewChecked$ = new Subject<void>();

  protected init() {
    this.onDestroy$.subscribe(() => this.onAfterViewChecked$.complete());
  }

  ngAfterViewChecked() {
    this.onAfterViewChecked$.next();
  }
}

@Directive()
export class WithAfterContentInit implements AfterContentInit {
  protected onAfterContentInit$ = new Subject<void>();

  ngAfterContentInit() {
    this.onAfterContentInit$.next();
    this.onAfterContentInit$.complete();
  }
}

@Directive()
export class WithAfterContentChecked extends Mixin(WithDestroy) implements AfterContentChecked {
  protected onAfterContentChecked$ = new Subject<void>();

  protected init() {
    this.onDestroy$.subscribe(() => this.onAfterContentChecked$.complete());
  }

  ngAfterContentChecked() {
    this.onAfterContentChecked$.next();
  }
}

@Directive()
export class WithDoCheck extends Mixin(WithDestroy) implements DoCheck {
  protected onDoCheck$ = new Subject<void>();

  protected init() {
    this.onDestroy$.subscribe(() => this.onDoCheck$.complete());
  }

  ngDoCheck() {
    this.onDoCheck$.next();
  }
}

@Directive()
export class WithOnChanges extends Mixin(WithDestroy) implements OnChanges {
  protected onChanges$ = new Subject<SimpleChanges>();

  protected init() {
    this.onDestroy$.subscribe(() => this.onChanges$.complete());
  }

  ngOnChanges(changes: SimpleChanges) {
    this.onChanges$.next(changes);
  }
}