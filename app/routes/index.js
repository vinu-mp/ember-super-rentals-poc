import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;
  // async model() {
  //   let response = await fetch('/api/rentals.json');
  //   let { data } = await response.json();

  //   return data.map((model) => {
  //     let { id, attributes } = model;
  //     let type;

  //     if (COMMUNITY_CATEGORIES.includes(attributes.category)) {
  //       type = 'Community';
  //     } else {
  //       type = 'Standalone';
  //     }

  //     return { id, type, ...attributes };
  //   });
  // }
  async model() {
    return this.store.findAll('rental');
  }
}
