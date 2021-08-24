'use strict';

define("ember-super-rentals/tests/acceptance/ember-super-rentals-test", ["qunit", "@ember/test-helpers", "ember-qunit"], function (_qunit, _testHelpers, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Acceptance | ember super rentals', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /', async function (assert) {
      await (0, _testHelpers.visit)('/');
      assert.equal((0, _testHelpers.currentURL)(), '/');
      assert.dom('nav').exists();
      assert.dom('h1').hasText('SuperRentals');
      assert.dom('h2').hasText('Welcome to Super Rentals!');
      assert.dom('.jumbo a.button').hasText('About us');
      await (0, _testHelpers.click)('.jumbo a.button');
      assert.equal((0, _testHelpers.currentURL)(), '/about');
    });
    (0, _qunit.test)('viewing the details of a rental property', async function (assert) {
      await (0, _testHelpers.visit)('/');
      assert.dom('.rental').exists({
        count: 3
      });
      await (0, _testHelpers.click)('.rental:first-of-type a');
      assert.equal((0, _testHelpers.currentURL)(), '/rentals/grand-old-mansion');
    });
    (0, _qunit.test)('visiting /rentals/grand-old-mansion', async function (assert) {
      await (0, _testHelpers.visit)('/rentals/grand-old-mansion');
      assert.equal((0, _testHelpers.currentURL)(), '/rentals/grand-old-mansion');
      assert.dom('nav').exists();
      assert.dom('h1').containsText('SuperRentals');
      assert.dom('h2').containsText('Grand Old Mansion');
      assert.dom('.share.button').hasText('Share on Twitter');
      let button = (0, _testHelpers.find)('.share.button');
      let tweetURL = new URL(button.href);
      assert.equal(tweetURL.host, 'twitter.com');
      assert.equal(tweetURL.searchParams.get('url'), `${window.location.origin}/rentals/grand-old-mansion`);
    });
    (0, _qunit.test)('visiting /getting-in-touch', async function (assert) {
      await (0, _testHelpers.visit)('/getting-in-touch');
      assert.equal((0, _testHelpers.currentURL)(), '/getting-in-touch');
      assert.dom('h2').hasText('Contact Us');
      assert.dom('.jumbo a.button').hasText('About us');
      await (0, _testHelpers.click)('.jumbo a.button');
      assert.equal((0, _testHelpers.currentURL)(), '/about');
    });
  });
});
define("ember-super-rentals/tests/integration/components/jumbo-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | jumbo', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders the content inside a jumbo header with a tomster', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Jumbo>Hello World</Jumbo>
      */
      {
        "id": "I+q5iC61",
        "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"Hello World\"]],[]]]]]],[],false,[\"jumbo\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('.jumbo').exists();
      assert.dom('.jumbo').hasText('Hello World');
      assert.dom('.jumbo .tomster').exists();
    });
  });
});
define("ember-super-rentals/tests/integration/components/map-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "ember-super-rentals/config/environment"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _environment) {
  "use strict";

  (0, _qunit.module)('Integration | Component | map', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders a map image for the specified parameters', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Map
            @lat="37.7797"
            @lng="-122.4184"
            @zoom="10"
            @width="150"
            @height="120"
          />
      */
      {
        "id": "IdNm1oWT",
        "block": "[[[8,[39,0],null,[[\"@lat\",\"@lng\",\"@zoom\",\"@width\",\"@height\"],[\"37.7797\",\"-122.4184\",\"10\",\"150\",\"120\"]],null]],[],false,[\"map\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('.map img').exists().hasAttribute('alt', 'Map image at coordinates 37.7797,-122.4184').hasAttribute('src').hasAttribute('width', '150').hasAttribute('height', '120');
      let {
        src
      } = (0, _testHelpers.find)('.map img');
      let token = encodeURIComponent(_environment.default.MAPBOX_ACCESS_TOKEN);
      assert.ok(src.startsWith('https://api.mapbox.com/'), 'the src starts with "https://api.mapbox.com/"');
      assert.ok(src.includes('-122.4184,37.7797,10'), 'the src should include the lng,lat,zoom parameter');
      assert.ok(src.includes('150x120@2x'), 'the src should include the width,height and @2x parameter');
      assert.ok(src.includes(`access_token=${token}`), 'the src should include the escaped access token');
    });
    (0, _qunit.test)('it updates the `src` attribute when the arguments change', async function (assert) {
      this.setProperties({
        lat: 37.7749,
        lng: -122.4194,
        zoom: 10,
        width: 150,
        height: 120
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Map
            @lat={{this.lat}}
            @lng={{this.lng}}
            @zoom={{this.zoom}}
            @width={{this.width}}
            @height={{this.height}}
          />
      */
      {
        "id": "Em6bIFrN",
        "block": "[[[8,[39,0],null,[[\"@lat\",\"@lng\",\"@zoom\",\"@width\",\"@height\"],[[30,0,[\"lat\"]],[30,0,[\"lng\"]],[30,0,[\"zoom\"]],[30,0,[\"width\"]],[30,0,[\"height\"]]]],null]],[],false,[\"map\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      let img = (0, _testHelpers.find)('.map img');
      assert.ok(img.src.includes('-122.4194,37.7749,10'), 'the src should include the lng,lat,zoom parameter');
      assert.ok(img.src.includes('150x120@2x'), 'the src should include the width,height and @2x parameter');
      this.setProperties({
        width: 300,
        height: 200,
        zoom: 12
      });
      assert.ok(img.src.includes('-122.4194,37.7749,12'), 'the src should include the lng,lat,zoom parameter');
      assert.ok(img.src.includes('300x200@2x'), 'the src should include the width,height and @2x parameter');
      this.setProperties({
        lat: 47.6062,
        lng: -122.3321
      });
      assert.ok(img.src.includes('-122.3321,47.6062,12'), 'the src should include the lng,lat,zoom parameter');
      assert.ok(img.src.includes('300x200@2x'), 'the src should include the width,height and @2x parameter');
    });
    (0, _qunit.test)('the default alt attribute can be overridden', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Map
            @lat="37.7797"
            @lng="-122.4184"
            @zoom="10"
            @width="150"
            @height="120"
            alt="A map of San Francisco"
          />
      */
      {
        "id": "KTAr5rIA",
        "block": "[[[8,[39,0],[[24,\"alt\",\"A map of San Francisco\"]],[[\"@lat\",\"@lng\",\"@zoom\",\"@width\",\"@height\"],[\"37.7797\",\"-122.4184\",\"10\",\"150\",\"120\"]],null]],[],false,[\"map\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('.map img').hasAttribute('alt', 'A map of San Francisco');
    });
    (0, _qunit.test)('the src, width and height attributes cannot be overridden', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Map
            @lat="37.7797"
            @lng="-122.4184"
            @zoom="10"
            @width="150"
            @height="120"
            src="/assets/images/teaching-tomster.png"
            width="200"
            height="300"
          />
      */
      {
        "id": "gHiVpqW5",
        "block": "[[[8,[39,0],[[24,\"src\",\"/assets/images/teaching-tomster.png\"],[24,\"width\",\"200\"],[24,\"height\",\"300\"]],[[\"@lat\",\"@lng\",\"@zoom\",\"@width\",\"@height\"],[\"37.7797\",\"-122.4184\",\"10\",\"150\",\"120\"]],null]],[],false,[\"map\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('.map img').hasAttribute('src', /^https:\/\/api\.mapbox\.com\//).hasAttribute('width', '150').hasAttribute('height', '120');
    });
  });
});
define("ember-super-rentals/tests/integration/components/navbar-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | navbar', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Navbar />
      */
      {
        "id": "Fxy8E5qS",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"navbar\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom(this.element).hasText(''); // Template block usage:

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Navbar>
              template block text
            </Navbar>
          
      */
      {
        "id": "kiRmRujy",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"navbar\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom(this.element).hasText('template block text');
    });
  });
});
define("ember-super-rentals/tests/integration/components/rental-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | rental', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders information about a rental property', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.setProperties({
        rental: {
          title: 'Grand Old Mansion',
          owner: 'Veruca Salt',
          city: 'San Francisco',
          location: {
            lat: 37.7749,
            lng: -122.4194
          },
          category: 'Estate',
          type: 'Standalone',
          bedrooms: 15,
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
          description: 'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.'
        }
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Rental @rental={{this.rental}} />
      */
      {
        "id": "BECEasIg",
        "block": "[[[8,[39,0],null,[[\"@rental\"],[[30,0,[\"rental\"]]]],null]],[],false,[\"rental\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('article').hasClass('rental');
      assert.dom('article h3').hasText('Grand Old Mansion');
      assert.dom('article .detail.owner').includesText('Veruca Salt');
      assert.dom('article .detail.type').includesText('Standalone');
      assert.dom('article .detail.location').includesText('San Francisco');
      assert.dom('article .detail.bedrooms').includesText('15');
      assert.dom('article .image').exists();
      assert.dom('article .map').exists();
    });
  });
});
define("ember-super-rentals/tests/integration/components/rental/detailed-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | rental/detailed', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.setProperties({
        rental: {
          id: 'grand-old-mansion',
          title: 'Grand Old Mansion',
          owner: 'Veruca Salt',
          city: 'San Francisco',
          location: {
            lat: 37.7749,
            lng: -122.4194
          },
          category: 'Estate',
          type: 'Standalone',
          bedrooms: 15,
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
          description: 'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.'
        }
      });
    });
    (0, _qunit.test)('it renders a header with a share button', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Rental::Detailed @rental={{this.rental}} />
      */
      {
        "id": "ooVFKl9K",
        "block": "[[[8,[39,0],null,[[\"@rental\"],[[30,0,[\"rental\"]]]],null]],[],false,[\"rental/detailed\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom(this.element).hasText('');
      assert.dom('.jumbo').exists();
      assert.dom('.jumbo h2').containsText('Grand Old Mansion');
      assert.dom('.jumbo p').containsText('a nice place to stay near San Francisco');
      assert.dom('.jumbo a.button').containsText('Share on Twitter');
    });
    (0, _qunit.test)('it renders detailed information about a rental property', async function (assert) {
      assert.dom('article').hasClass('rental');
      assert.dom('article h3').containsText('About Grand Old Mansion');
      assert.dom('article .detail.owner').containsText('Veruca Salt');
      assert.dom('article .detail.type').containsText('Standalone – Estate');
      assert.dom('article .detail.location').containsText('San Francisco');
      assert.dom('article .detail.bedrooms').containsText('15');
      assert.dom('article .image').exists();
      assert.dom('article .map').exists();
    });
  });
});
define("ember-super-rentals/tests/integration/components/rental/image-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | rental/image', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders the given image', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Rental::Image />
      */
      {
        "id": "J5pw02OV",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"rental/image\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom(this.element).hasText('');
      assert.dom('.image img').exists().hasAttribute('src', '/assets/images/teaching-tomster.png').hasAttribute('alt', 'Teaching Tomster');
    });
    (0, _qunit.test)('clicking on the component toggles its size', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Rental::Image
              src="/assets/images/teaching-tomster.png"
              alt="Teaching Tomster"
            />
          
      */
      {
        "id": "VtiW+0j0",
        "block": "[[[1,\"\\n      \"],[8,[39,0],[[24,\"src\",\"/assets/images/teaching-tomster.png\"],[24,\"alt\",\"Teaching Tomster\"]],null,null],[1,\"\\n    \"]],[],false,[\"rental/image\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('button.image').exists();
      assert.dom('.image').doesNotHaveClass('large');
      assert.dom('.image small').hasText('View Larger');
      await (0, _testHelpers.click)('button.image');
      assert.dom('.image').hasClass('large');
      assert.dom('.image small').hasText('View Smaller');
      await (0, _testHelpers.click)('button.image');
      assert.dom('.image').doesNotHaveClass('large');
      assert.dom('.image small').hasText('View Larger');
    });
  });
});
define("ember-super-rentals/tests/integration/components/rentals-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | rentals', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Rentals />
      */
      {
        "id": "2ZbA4uNv",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"rentals\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom(this.element).hasText(''); // Template block usage:

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Rentals>
              template block text
            </Rentals>
          
      */
      {
        "id": "QPN1YXzT",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"rentals\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom(this.element).hasText('template block text');
    });
  });
});
define("ember-super-rentals/tests/integration/components/rentals/filter-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | rentals/filter', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Rentals::Filter />
      */
      {
        "id": "0BUeUBJ0",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"rentals/filter\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom(this.element).hasText(''); // Template block usage:

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Rentals::Filter>
              template block text
            </Rentals::Filter>
          
      */
      {
        "id": "Qt599p0x",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"rentals/filter\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom(this.element).hasText('template block text');
    });
  });
});
define("ember-super-rentals/tests/integration/components/share-button-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "@ember/service"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _service) {
  "use strict";

  class MockRouterService extends _service.default {
    get currentURL() {
      return '/foo/bar?baz=true#some-section';
    }

  }

  (0, _qunit.module)('Integration | Component | share-button', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.owner.register('service:router', MockRouterService);

      this.tweetParam = param => {
        let link = (0, _testHelpers.find)('a');
        let url = new URL(link.href);
        return url.searchParams.get(param);
      };
    });
    (0, _qunit.test)('basic usage', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <ShareButton>Tweet this!</ShareButton>
      */
      {
        "id": "GSbyilVW",
        "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"Tweet this!\"]],[]]]]]],[],false,[\"share-button\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('a').hasAttribute('target', '_blank').hasAttribute('rel', 'external nofollow noopener noreferrer').hasAttribute('href', /^https:\/\/twitter\.com\/intent\/tweet/).hasClass('share').hasClass('button').containsText('Tweet this!');
      assert.equal(this.tweetParam('url'), new URL('/foo/bar?baz=true#some-section', window.location.origin));
    });
    (0, _qunit.test)('it supports passing @text', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <ShareButton @text="Hello Twitter!">Tweet this!</ShareButton>
      */
      {
        "id": "B6EFBitm",
        "block": "[[[8,[39,0],null,[[\"@text\"],[\"Hello Twitter!\"]],[[\"default\"],[[[[1,\"Tweet this!\"]],[]]]]]],[],false,[\"share-button\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.tweetParam('text'), 'Hello Twitter!');
    });
    (0, _qunit.test)('it supports passing @hashtags', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <ShareButton @hashtags="foo,bar,baz">Tweet this!</ShareButton>
      */
      {
        "id": "A3XhHF/Z",
        "block": "[[[8,[39,0],null,[[\"@hashtags\"],[\"foo,bar,baz\"]],[[\"default\"],[[[[1,\"Tweet this!\"]],[]]]]]],[],false,[\"share-button\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.tweetParam('hashtags'), 'foo,bar,baz');
    });
    (0, _qunit.test)('it supports passing @via', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <ShareButton @via="emberjs">Tweet this!</ShareButton>
      */
      {
        "id": "DcHPI+64",
        "block": "[[[8,[39,0],null,[[\"@via\"],[\"emberjs\"]],[[\"default\"],[[[[1,\"Tweet this!\"]],[]]]]]],[],false,[\"share-button\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.tweetParam('via'), 'emberjs');
    });
    (0, _qunit.test)('it supports adding extra classes', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <ShareButton class="extra things">Tweet this!</ShareButton>
      */
      {
        "id": "8aLYpL0j",
        "block": "[[[8,[39,0],[[24,0,\"extra things\"]],null,[[\"default\"],[[[[1,\"Tweet this!\"]],[]]]]]],[],false,[\"share-button\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('a').hasClass('share').hasClass('button').hasClass('extra').hasClass('things');
    });
    (0, _qunit.test)('the target, rel and href attributes cannot be overridden', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <ShareButton target="_self" rel="" href="/">Not a Tweet!</ShareButton>
      */
      {
        "id": "YxoJ4lv6",
        "block": "[[[8,[39,0],[[24,\"target\",\"_self\"],[24,\"rel\",\"\"],[24,6,\"/\"]],null,[[\"default\"],[[[[1,\"Not a Tweet!\"]],[]]]]]],[],false,[\"share-button\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('a').hasAttribute('target', '_blank').hasAttribute('rel', 'external nofollow noopener noreferrer').hasAttribute('href', /^https:\/\/twitter\.com\/intent\/tweet/);
    });
  });
});
define("ember-super-rentals/tests/test-helper", ["ember-super-rentals/app", "ember-super-rentals/config/environment", "qunit", "@ember/test-helpers", "qunit-dom", "ember-qunit"], function (_app, _environment, QUnit, _testHelpers, _qunitDom, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _qunitDom.setup)(QUnit.assert);
  (0, _emberQunit.start)();
});
define("ember-super-rentals/tests/unit/adapters/application-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Adapter | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:application');
      assert.ok(adapter);
    });
  });
});
define("ember-super-rentals/tests/unit/models/rental-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | rental', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = store.createRecord('rental', {});
      assert.ok(model);
    });
  });
});
define("ember-super-rentals/tests/unit/routes/about-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | about', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:about');
      assert.ok(route);
    });
  });
});
define("ember-super-rentals/tests/unit/routes/contact-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | contact', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:contact');
      assert.ok(route);
    });
  });
});
define("ember-super-rentals/tests/unit/routes/index-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:index');
      assert.ok(route);
    });
  });
});
define("ember-super-rentals/tests/unit/routes/rental-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | rental', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:rental');
      assert.ok(route);
    });
  });
});
define("ember-super-rentals/tests/unit/serializers/application-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Serializer | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let serializer = store.serializerFor('application');
      assert.ok(serializer);
    });
    (0, _qunit.test)('it serializes records', function (assert) {
      let store = this.owner.lookup('service:store');
      let record = store.createRecord('application', {});
      let serializedRecord = record.serialize();
      assert.ok(serializedRecord);
    });
  });
});
define('ember-super-rentals/config/environment', [], function() {
  var prefix = 'ember-super-rentals';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('ember-super-rentals/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
