import http.server
import socketserver
import mimetypes

PORT = 3001

# Add correct MIME type for YAML
mimetypes.add_type('text/yaml', '.yml')
mimetypes.add_type('text/yaml', '.yaml')

Handler = http.server.SimpleHTTPRequestHandler
# Ensure extensions map is updated if necessary, though add_type affects the global map used by SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()
