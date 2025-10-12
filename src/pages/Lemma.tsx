import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Button, Col, Row, Spinner } from "reactstrap";
import { LEMMATA } from "../queries";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useMemo, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const Lemma = () => {
  const { lemmaId } = useParams();

  const { data, loading } = useQuery(LEMMATA);
  const lemma = useMemo(() => data?.lemmata?.data?.find(l => l.id === lemmaId), [ data?.lemmata?.data, lemmaId ])

  // download PDF logic
  const pdfElementRef = useRef<HTMLDivElement | null>(null);
  const downloadPDF = async () => {
    const element = pdfElementRef.current;
    if (element) {
      element.classList.add('print-mode')

      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale often results in crisper text/images
        useCORS: true // Essential if you have images from different domains
      });

      // Get the image data from the canvas
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Setup the PDF
      // 'p' for portrait, 'mm' for millimeters, 'a4' for page size
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate the aspect ratio to fit the image to the PDF page width
      const ratio = imgWidth / pdfWidth;
      const canvasHeightInPDF = imgHeight / ratio;

      let heightLeft = canvasHeightInPDF;
      let position = 0; // Y-position on the PDF page

      // Add the first page
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, canvasHeightInPDF);
      heightLeft -= pdfHeight;

      // Add new pages as long as there's content left
      while (heightLeft > 0) {
        position = position - pdfHeight; // Move the image "up" on the next page
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, canvasHeightInPDF);
        heightLeft -= pdfHeight;
      }

      // Save the PDF
      pdf.save('download.pdf');

      element.classList.remove('print-mode')
    }
  }

  if (!lemma) return null;
  const { attributes } = lemma;

  return (
    <div>
      {loading && (
        <Spinner />
      )}
      <div ref={pdfElementRef}>
        <Row>
          <Col xs={12} lg={9} style={{ borderRight: '1px dashed lightgray' }}>
            <div className="lemma-header">
              <div>
                <div className="d-flex justify-content-between align-items-end">
                  <div className="d-flex gap-3 align-items-end">
                    <div>
                      <h3>{attributes?.titel} ({attributes?.jaar})</h3>
                    </div>
                    <div className="text-secondary">
                      {attributes?.auteur_voornaam} {attributes?.auter_achternaam}
                    </div>
                  </div>
                  <Button className="hide-in-print-mode" onClick={downloadPDF}>
                    Download PDF
                  </Button>
                </div>
                <div className="mt-3">
                  {attributes?.de_kern && (
                    <BlocksRenderer content={attributes?.de_kern} />
                  )}
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={3}>
            <div className="h-100 d-flex align-items-center justify-content-center">
              <div className="image-wrapper xl">
                <img src={attributes?.afbeelding?.data?.attributes?.url} />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={9} style={{ borderRight: '1px dashed lightgray' }}>
            {attributes?.doelgroep && (
              <div className="lemma-main-section">
                <h5>Doelgroep</h5>
                <BlocksRenderer content={attributes?.doelgroep} />
              </div>
            )}
            {attributes?.motieven && (
              <div className="lemma-main-section">
                <h5>Motieven</h5>
                <BlocksRenderer content={attributes?.motieven} />
              </div>
            )}
            {attributes?.het_verhaal && (
              <div className="lemma-main-section">
                <h5>Het verhaal</h5>
                <BlocksRenderer content={attributes?.het_verhaal} />
              </div>
            )}
            {attributes?.analyse && (
              <div className="lemma-main-section">
                <h5>Analyse en interpretatie</h5>
                <BlocksRenderer content={attributes?.analyse} />
              </div>
            )}
            {attributes?.lessuggesties && (
              <div className="lemma-main-section">
                <h5>Didactische vragen en lessuggesties</h5>
                <BlocksRenderer content={attributes?.lessuggesties} />
              </div>
            )}
            {attributes?.kerndoelen && (
              <div className="lemma-main-section">
                <h5>Kerndoelen Nederlands</h5>
                <BlocksRenderer content={attributes?.kerndoelen} />
              </div>
            )}
            <div className="lemma-main-section">
              <h5>Vindplaatsen en bronnen</h5>
              {attributes?.bronnen && (
                <BlocksRenderer content={attributes?.bronnen} />
              )}
            </div>
          </Col>
          <Col xs={12} lg={3}>
            {/* <div className="lemma-side-section">
            <h5>Thematische tags</h5>
          </div> */}
            <div className="lemma-side-section">
              <h5>⁠Opstaptitels</h5>
              {attributes?.opstaptitels_extern && (
                <BlocksRenderer content={attributes?.opstaptitels_extern} />
              )}
            </div>
            <div className="lemma-side-section">
              <h5>Verder lezen</h5>
              {attributes?.verder_lezen_extern && (
                <BlocksRenderer content={attributes?.verder_lezen_extern} />
              )}
            </div>
          </Col>
        </Row >
      </div>
    </div >
  )
}