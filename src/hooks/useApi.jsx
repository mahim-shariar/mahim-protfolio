import { useState, useCallback } from "react";
import { httpService } from "../services/apiService";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const callApi = useCallback(
    async (method, url, requestData = null, config = {}) => {
      setLoading(true);
      setError(null);

      try {
        const result = await httpService[method](url, requestData, config);
        setData(result);
        return result;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const get = useCallback(
    (url, config) => callApi("get", url, null, config),
    [callApi]
  );
  const post = useCallback(
    (url, data, config) => callApi("post", url, data, config),
    [callApi]
  );
  const put = useCallback(
    (url, data, config) => callApi("put", url, data, config),
    [callApi]
  );
  const del = useCallback(
    (url, config) => callApi("delete", url, null, config),
    [callApi]
  );
  const patch = useCallback(
    (url, data, config) => callApi("patch", url, data, config),
    [callApi]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    get,
    post,
    put,
    delete: del,
    patch,
    reset,
    setData,
    setError,
  };
};
