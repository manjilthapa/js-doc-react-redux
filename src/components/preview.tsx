import "./preview.css"
import { useRef, useEffect, FC } from "react"

interface PreviewProps {
  code: string
}

const Preview: FC<PreviewProps> = ({ code }) => {
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

  return (
    <div className="preview-wrapper">
      <iframe title="preview" ref={iframe} sandbox="allow-scripts" srcDoc={html} />
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
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
        }
      }, false);
    </script>
  </body>
</html>
`
