const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000"
).replace(/\/+$/, "");

/* =========================================================
   CONFIG
========================================================= */

const REQUEST_TIMEOUT = 12000;
const MAX_RETRIES = 2;
const RETRY_DELAY = 700;

/* =========================================================
   HELPERS
========================================================= */

function buildUrl(path, query = "") {
  const cleanPath = path.startsWith("/")
    ? path
    : `/${path}`;

  const cleanQuery = query
    ? query.startsWith("?")
      ? query
      : `?${query}`
    : "";

  return `${API_BASE_URL}${cleanPath}${cleanQuery}`;
}

function sleep(ms) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}

/* =========================================================
   FETCH WITH RETRY
========================================================= */

async function fetchWithRetry(
  url,
  options = {},
  retries = MAX_RETRIES
) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      return response;
    } catch (error) {
      clearTimeout(timeoutId);

      lastError = error;

      /*
       * Retry only for temporary network/backend failures.
       */
      if (attempt < retries) {
        await sleep(
          RETRY_DELAY * (attempt + 1)
        );
      }
    }
  }

  throw lastError;
}

/* =========================================================
   RESPONSE PARSER
========================================================= */

async function parseApiResponse(response) {
  const contentType =
    response.headers.get("content-type") || "";

  if (
    contentType.includes("application/json")
  ) {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error ||
          data?.message ||
          `Request failed with status ${response.status}.`
      );
    }

    return data;
  }

  const text = await response.text();

  if (!response.ok) {
    throw new Error(
      text ||
        `Request failed with status ${response.status}.`
    );
  }

  throw new Error(
    text ||
      "Unexpected server response."
  );
}

/* =========================================================
   MEDIA URL
========================================================= */

export function mediaUrl(value) {
  if (!value) {
    return "";
  }

  const stringValue = String(value).trim();

  if (!stringValue) {
    return "";
  }

  /*
   * Already absolute / browser-managed URL
   */
  if (
    stringValue.startsWith("data:") ||
    stringValue.startsWith("http://") ||
    stringValue.startsWith("https://") ||
    stringValue.startsWith("blob:")
  ) {
    return stringValue;
  }

  /*
   * Relative backend media path
   */
  return `${API_BASE_URL}${
    stringValue.startsWith("/")
      ? ""
      : "/"
  }${stringValue}`;
}

/* =========================================================
   COURSES
========================================================= */

export async function getCourses(
  query = ""
) {
  const url = buildUrl(
    "/api/courses",
    query || "?limit=100"
  );

  const response = await fetchWithRetry(
    url,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  return parseApiResponse(response);
}

export async function getCourse(
  identifier
) {
  if (!identifier) {
    throw new Error(
      "Course identifier is missing."
    );
  }

  const url = buildUrl(
    `/api/courses/${encodeURIComponent(
      identifier
    )}`
  );

  const response = await fetchWithRetry(
    url,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  return parseApiResponse(response);
}

/* =========================================================
   NEWS & INSIGHTS
========================================================= */

export async function getNews(
  query = ""
) {
  const url = buildUrl(
    "/api/news",
    query || "?limit=50"
  );

  const response = await fetchWithRetry(
    url,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  const data =
    await parseApiResponse(response);

  /*
   * Supports:
   * []
   *
   * OR:
   * {
   *   items: []
   * }
   */

  if (Array.isArray(data)) {
    return data;
  }

  if (
    Array.isArray(data?.items)
  ) {
    return data.items;
  }

  if (
    Array.isArray(data?.news)
  ) {
    return data.news;
  }

  if (
    Array.isArray(data?.data)
  ) {
    return data.data;
  }

  return [];
}

/* =========================================================
   NEWS DETAILS
========================================================= */

export async function getNewsItem(
  identifier
) {
  if (!identifier) {
    throw new Error(
      "News identifier is missing."
    );
  }

  const url = buildUrl(
    `/api/news/${encodeURIComponent(
      identifier
    )}`
  );

  const response = await fetchWithRetry(
    url,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  return parseApiResponse(response);
}

/* =========================================================
   COMPATIBILITY ALIAS
========================================================= */

export const getNewsBySlug =
  getNewsItem;

/* =========================================================
   OPTIONAL: EXPORT API BASE URL
========================================================= */

export { API_BASE_URL };