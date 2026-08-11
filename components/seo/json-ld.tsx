/**
 * The structured data graph, as a `application/ld+json` block.
 *
 * The payload is passed as the element's child rather than through
 * `dangerouslySetInnerHTML`. React renders a single string child verbatim, and
 * a script of this type is data the browser never executes — the same shape
 * `MotionFallback` uses for its `<style>`, and the reason nothing in this app
 * has to inject raw HTML.
 *
 * `JSON.stringify` escapes nothing that means anything to an HTML parser, so a
 * `</script>` sequence inside any string value would end the block early and
 * spill the rest of the graph into the document as markup. Escaping `<`, `>`
 * and `&` to their `\u` forms closes that: the three characters that can start
 * markup never reach the parser, and the escapes are ordinary JSON that any
 * consumer reads straight back as the original characters.
 */
export function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return <script type="application/ld+json">{json}</script>;
}
