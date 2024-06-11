export const body = (children) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Secure page</title>
        <script src="/cdn-tailwindcss.js"></script>
      </head>
      <div class="mx-auto mb-0 mt-8 max-w-md space-y-4">
      ${children}
      </div>
    </html>
  `;
};
