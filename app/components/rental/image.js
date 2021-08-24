import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RentalImageComponent extends Component {
  @tracked isLarge = false;

  @action
  toggleZoom() {
    this.isLarge = !this.isLarge;
  }
}
