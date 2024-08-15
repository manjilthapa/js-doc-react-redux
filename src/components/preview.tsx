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
    iframeRefValue.addEventListener("load", () => {
      iframeRefValue?.contentWindow?.postMessage(code, "*")
    })
    return () => {
      if (iframeRefValue) {
        iframeRefValue.removeEventListener("load", () => {
          iframeRefValue?.contentWindow?.postMessage(code, "*")
        })
      }
    }
  }, [code])

  return <iframe title="preview" ref={iframe} sandbox="allow-scripts" srcDoc={html} />
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
