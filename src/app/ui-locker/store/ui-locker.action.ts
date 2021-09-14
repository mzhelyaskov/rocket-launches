export class IncrementPendingRequests {
  static readonly type = '[UiLocker] increment pending requests';
}

export class DecrementPendingRequests {
  static readonly type = '[UiLocker] decrement pending requests';
}

export class UnlockUi {
  static readonly type = '[UiLocker] unlock ui';
}
