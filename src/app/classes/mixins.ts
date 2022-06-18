import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { Subject } from "rxjs";
import mixin, { MixinConstructor } from "ts-mixin-extended";

export function WithDestroy<TBase extends MixinConstructor>(Base: TBase) {
  return class WithDestroy extends Base implements OnDestroy {
    protected onDestroy$ = new Subject<void>();

    ngOnDestroy() {
      this.onDestroy$.next();
      this.onDestroy$.complete();
    }
  }
}

export function WithInit<TBase extends MixinConstructor>(Base: TBase) {
  return class WithInit extends Base implements OnInit {
    protected onInit$ = new Subject<void>();

    ngOnInit() {
      this.onInit$.next();
      this.onInit$.complete();
    }
  }
}

export function WithAfterViewInit<TBase extends MixinConstructor>(Base: TBase) {
  return class WithAfterViewInit extends Base implements AfterViewInit {
    protected onAfterViewInit$ = new Subject<void>();

    ngAfterViewInit() {
      this.onAfterViewInit$.next();
      this.onAfterViewInit$.complete();
    }
  }
}

export function WithAfterViewChecked<TBase extends MixinConstructor>(Base: TBase) {
  return class WithAfterViewChecked extends mixin(Base, WithDestroy) implements AfterViewChecked {
    protected onAfterViewChecked$ = new Subject<void>();

    constructor(...args: any[]) {
      super(...args);
      this.onDestroy$.subscribe(() => this.onAfterViewChecked$.complete());
    }


    ngAfterViewChecked() {
      this.onAfterViewChecked$.next();
    }
  }
}

export function WithAfterContentInit<TBase extends MixinConstructor>(Base: TBase) {
  return class WithAfterContentInit extends Base implements AfterContentInit {
    protected onAfterContentInit$ = new Subject<void>();

    ngAfterContentInit() {
      this.onAfterContentInit$.next();
      this.onAfterContentInit$.complete();
    }
  }
}

export function WithAfterContentChecked<TBase extends MixinConstructor>(Base: TBase) {
  return class WithAfterContentChecked extends mixin(Base, WithDestroy) implements AfterContentChecked {
    protected onAfterContentChecked$ = new Subject<void>();

    constructor(...args: any[]) {
      super(...args);
      this.onDestroy$.subscribe(() => this.onAfterContentChecked$.complete());
    }

    ngAfterContentChecked() {
      this.onAfterContentChecked$.next();
    }
  }
}

export function WithDoCheck<TBase extends MixinConstructor>(Base: TBase) {
  return class WithDoCheck extends mixin(Base, WithDestroy) implements DoCheck {
    protected onDoCheck$ = new Subject<void>();

    constructor(...args: any[]) {
      super(...args);
      this.onDestroy$.subscribe(() => this.onDoCheck$.complete());
    }

    ngDoCheck() {
      this.onDoCheck$.next();
    }
  }
}

export function WithOnChanges<TBase extends MixinConstructor>(Base: TBase) {
  return class WithOnChanges extends mixin(Base, WithDestroy) implements OnChanges {
    protected onChanges$ = new Subject<SimpleChanges>();

    constructor(...args: any[]) {
      super(...args);
      this.onDestroy$.subscribe(() => this.onChanges$.complete());
    }

    ngOnChanges(changes: SimpleChanges) {
      this.onChanges$.next(changes);
    }
  }
}