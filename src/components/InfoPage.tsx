import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { Card, CardBody, Col, Row } from "reactstrap"
import { FullPageSpinner } from "./FullPageSpinner"

export const InfoPage = (props: {
  titel: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tekst: any,
  fotoUrl: string | undefined,
  loading: boolean,
  fotoReplacement?: React.ReactNode;
}) => props.loading ? <FullPageSpinner /> : (
  <>
    <Row>
      <Col xs={12}>
        <h4 className="mb-3">
          {props.titel}
        </h4>
      </Col>
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