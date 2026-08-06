const DEFAULT_BACKEND_URL = "http://127.0.0.1:3000";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const backendUrl = new URL(
    "/greet",
    process.env.BACKEND_URL ?? DEFAULT_BACKEND_URL,
  );
  backendUrl.search = requestUrl.search;

  try {
    const backendResponse = await fetch(backendUrl, {
      cache: "no-store",
    });
    const headers = new Headers();
    const contentType = backendResponse.headers.get("content-type");

    if (contentType) {
      headers.set("content-type", contentType);
    }

    return new Response(backendResponse.body, {
      status: backendResponse.status,
      headers,
    });
  } catch {
    return Response.json(
      { message: "Unable to reach greeting backend." },
      { status: 502 },
    );
  }
}
