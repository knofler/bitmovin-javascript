import * as urljoin from 'url-join';

import http, {utils} from '../utils/http';
import {HttpClient} from '../utils/types';

export const filters = (configuration, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;

  const typeFn = typeUrl => {
    const resourceDetails = filterId => {
      return {
        details: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/filters', typeUrl, filterId);

          return get(configuration, url);
        },
        customData: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/filters', typeUrl, filterId, 'customData');

          return get(configuration, url);
        },
        delete: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/filters', typeUrl, filterId);

          return delete_(configuration, url);
        }
      };
    };

    const create = filter => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/filters', typeUrl);

      return post(configuration, url, filter);
    };

    const list = utils.buildListCallFunction(
      httpClient,
      configuration,
      urljoin(configuration.apiBaseUrl, 'encoding/filters', typeUrl)
    );

    const resource = Object.assign(resourceDetails, {create, list});
    return resource;
  };

  return {
    crop: typeFn('crop'),
    deinterlace: typeFn('deinterlace'),
    rotate: typeFn('rotate'),
    watermark: typeFn('watermark'),

    list: utils.buildListCallFunction(httpClient, configuration, urljoin(configuration.apiBaseUrl, 'encoding/filters'))
  };
};

export default configuration => {
  return filters(configuration, http);
};
