
export const createSuccessResponse = (
  body = {},
) => {
  const data = {
    succ: 1,
    body,
  }
  return new Response(JSON.stringify(data), { status: 200 });
};