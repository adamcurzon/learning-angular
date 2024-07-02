import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  protected errorMessage: String = '';
  private animationTime = 5000;

  constructor() {}

  isShown() {
    return this.errorMessage.length > 0;
  }

  setErrorMessage(errorMessage: String) {
    this.errorMessage = errorMessage;

    setTimeout(() => {
      this.errorMessage = '';
    }, this.animationTime);
  }

  getErrorMessage(): String {
    return this.errorMessage;
  }
}
