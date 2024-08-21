import "./preview.css"
import { useRef, useEffect, FC } from "react"

interface PreviewProps {
  code: string
  error: string
}

const Preview: FC<PreviewProps> = ({ code, error }) => {
  const iframe = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    let iframeRefValue = iframe.current
    if (!iframeRefValue) {
      return
    }

    iframeRefValue.srcdoc = html
    setTimeout(() => {
      iframeRefValue?.contentWindow?.postMessage(code, "*")
    }, 50)
  }, [code])

  console.log(error)

  return (
    <div className="preview-wrapper">
      <iframe title="preview" ref={iframe} sandbox="allow-scripts" srcDoc={html} />
      {error && <div className="preview-error">{error}</div>}
    </div>
  )
}

export default Preview

const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (err) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
      }

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      });

      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          handleError(err);
        }
      }, false);
    </script>
  </body>
</html>
`
