import Bitmovin from '../bitmovin/bitmovin'

describe('Bitmovin default exports', () => {
  const apiKey = 'test-api-key';
  const additionalHeaders = {'X-Test-Header': 'test'};

  const client = new Bitmovin({
    apiKey,
    additionalHeaders
  });

  describe('configuration', () => {
    it('should set correct ApiKey', () => {
      expect(client.configuration.apiKey).toEqual(apiKey)
    })
    it('should contain additionalHeaders', () => {
      expect(client.configuration.additionalHeaders)
        .toEqual(expect.objectContaining({'X-Test-Header': 'test'}))
    })
    it('should add additionalHeaders to httpHeaders', () => {
      expect(client.configuration.httpHeaders)
        .toEqual(expect.objectContaining({'X-Test-Header': 'test'}))
    })
    it('should default additionalHeaders to {}', () => {
      expect(new Bitmovin({apiKey}).configuration.additionalHeaders)
        .toEqual({})
    })
  })
  describe('encoding', () => {
    const assertItContains = (key) => {
      it('should contain ' + key, () => {
        expect(typeof client.encoding[key]).toBeDefined()
      });
    }
    assertItContains('encodings')
    assertItContains('codecConfigurations')
    assertItContains('inputs')
    assertItContains('outputs')
    assertItContains('manifests')
    assertItContains('filters')
    assertItContains('statistics')
    assertItContains('infrastructure')
  })
  describe('analytics', () => {
    const assertItContains = (key) => {
      it('should contain ' + key, () => {
        expect(typeof client.analytics[key]).toEqual('function');
      });
    }
    assertItContains('impressions')
    assertItContains('licenses')
    assertItContains('queries')
  })
  describe('player', () => {
    const assertItContains = (key) => {
      it('should contain ' + key, () => {
        expect(typeof client.player[key]).toEqual('function');
      });
    }
    assertItContains('licenses')
    assertItContains('channels')
  })
})
