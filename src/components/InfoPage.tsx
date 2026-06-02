import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useEffect } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { useCleanAnchorLinks } from "../useCleanAnchorLinks";
import { FullPageSpinner } from "./FullPageSpinner";

export const InfoPage = (props: {
  titel: string,
  titleRightElement?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tekst: any,
  fotoUrl: string | undefined,
  loading: boolean,
  fotoReplacement?: React.ReactNode;
  fotoReplacementTitle?: string
}) => {

  // clean anchor links when loading is done
  const cleanAnchorLinks = useCleanAnchorLinks();
  useEffect(cleanAnchorLinks, [ cleanAnchorLinks, props.loading ])

  if (props.loading) return <FullPageSpinner />

  return (
    <>
      <Row>
        <Col xs={12} lg={props.fotoReplacementTitle ? 8 : 12}>
          <div className="my-1 d-flex align-items-center justify-content-between">
            <h4 className="mb-0">
              {props.titel}
            </h4>
            {props.titleRightElement && (
              <div>
                {props.titleRightElement}
              </div>
            )}
          </div>
        </Col>
        {props.fotoReplacementTitle && (
          <Col xs={12} lg={4}>
            <h4 className="mb-3">
              {props.fotoReplacementTitle}
            </h4>
          </Col>
        )}
      </Row>
      <Row className="align-items-stretch">
        <Col xs={12} lg={props.fotoUrl || props.fotoReplacement ? 8 : 12}>
          <Card className="h-100">
            <CardBody>
              {props.tekst && (
                <BlocksRenderer content={props.tekst} />
              )}
            </CardBody>
          </Card>
        </Col>
        {props.fotoReplacement && (
          <Col xs={12} lg={4}>
            {props.fotoReplacement}
          </Col>
        )}
        {props.fotoUrl && (
          <Col xs={12} lg={4}>
            <div className="image-wrapper info-page">
              <img src={props.fotoUrl} />
            </div>
          </Col>
        )}
      </Row></>
  )
}