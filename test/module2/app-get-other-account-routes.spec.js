const R = require('ramda');

describe('Checking and Credit Routes', () => {
  let creditStack;
  let checkingStack;
  let creditHandleSpy;
  let checkingHandleSpy;

  before(() => {
    creditStack = routeStack('/credit', 'get');
    if (typeof creditStack === 'undefined') {
      creditHandleSpy = { restore: () => { } };
    } else {
      creditHandleSpy = sinon.spy(creditStack, 'handle');
    }
    checkingStack = routeStack('/checking', 'get');
    if (typeof checkingStack === 'undefined') {
      checkingHandleSpy = { restore: () => { } };
    } else {
      checkingHandleSpy = sinon.spy(checkingStack, 'handle');
    }
  });

  it('should contain the index route @app-get-index-route', () => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    const req = mockReq();
    const res = mockRes();

    assert(typeof creditHandleSpy === 'function', 'The credit get route has not been created.');
    creditHandleSpy(req, res);
    assert(res.render.called, 'The index route may have not been created.');
    assert(res.render.firstCall.args[0] === 'account', 'The index route does not seem to be rendering the `index` view.');
    assert(typeof res.render.firstCall.args[1] === 'object', 'res.render maybe missing arguments');
    assert(
      R.has('title')(res.render.firstCall.args[1]),
      'The index route maybe missing an object with a account key value pair.'
    );

    assert(typeof checkingHandleSpy === 'function', 'The credit get route has not been created.');
    checkingHandleSpy(req, res);
    assert(res.render.called, 'The index route may have not been created.');
    assert(res.render.firstCall.args[0] === 'account', 'The index route does not seem to be rendering the `index` view.');
    assert(typeof res.render.firstCall.args[1] === 'object', 'res.render maybe missing arguments');
    assert(
      R.has('account')(res.render.firstCall.args[1]),
      'The index route maybe missing an object with a account key value pair.'
    );
  });

  after(() => {
    creditHandleSpy.restore();
    checkingHandleSpy.restore();
  });
});
